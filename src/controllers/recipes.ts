import { Request, Response } from 'express';

import { sendError } from '../helpers';
import { Recipe } from '../models';

import { IRequestRecipe } from '../interfaces';


export const createRecipe = async (req: Request, res: Response) => {

    const { title, review, record } = req.body as IRequestRecipe;

    try {

        let recipedb = await Recipe.findOne({ title:  title.toLocaleLowerCase() });

        if(recipedb && recipedb.active) {
            return res.status(401).json({
                ok: false,
                message: `The Recipe: ${recipedb.title}, already exist`,
            });
        }

        if(recipedb && !recipedb.active) {

            const recipeUpdated = await Recipe.findOneAndUpdate(
                { title },
                {
                    ...req.body,
                    active: true,
                    reviewValues: [ review ],
                    record: [ record, ...recipedb.record ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Recipe created: ${ recipeUpdated!.title }`,
                recipe: recipeUpdated,
            });
        }

        const newRecipe = new Recipe({
            ...req.body,
            reviewValues: [ review ],
            record: [ record ],
        });
        
        await newRecipe.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Recipe created: ${ newRecipe.title }`,
            recipe: newRecipe,
        });

    } catch (error) {
        sendError(res, error);
    }
    
}

export const updateRecipe = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { review, record } = req.body as IRequestRecipe;

    try {

        const recipedb = await Recipe.findById({ _id: id, active: true });

        const newReviewValues = [ review, ...recipedb!.reviewValues! ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) / 100 ;

        const recipeUpdated = await Recipe.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
                active: true,
                review: newReview,
                reviewValues: newReviewValues,
                record: [ record, ...recipedb!.record ],
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Recipe with id: ${id} updated`,
            recipe: recipeUpdated,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteRecipe = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestRecipe;

    try {
        
        const recipedb = await Recipe.findById({ _id: id, active: true });

        const recipeDeleted = await Recipe.findByIdAndUpdate(
            { _id: id },
            { 
                active: false, 
                record: [ record, ...recipedb!.record ] 
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id} deleted`,
            recipe: recipeDeleted,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const getRecipeById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const recipedb = await Recipe.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Recipe with id: ${id}`,
            recipe: recipedb,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getAllRecipes = async (req: Request, res: Response) => {

    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };

    try {

        const allRecipes = await Recipe.paginate(
            { }, 
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: 'All Recipes',
            recipes: allRecipes,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getRecipesByFilterAndTerm = async (req: Request, res: Response) => {

    const { filter } = req.params as { filter: string };
    const { term, limit = 10, page = 1 } = req.query as { term: string, limit: string, page: string };

    const regex = new RegExp(term, 'i');


    const sendResponse = ( filter: string, term: string, recipes: any ) => {

        return res.status(200).json({
            ok: true,
            message: `All Recipes by filter: ${ filter } & term: ${ term }`,   
            recipes,
        });
    }

    try {

        let dbRecipes: any;

        switch (filter) {

            case 'title':

                dbRecipes = await Recipe.paginate(
                    { title: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );
                
                return sendResponse(filter, term, dbRecipes);

            case 'appetizer':
                
                dbRecipes = await Recipe.paginate(
                    { appetizer: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );
                
                return sendResponse(filter, term, dbRecipes);

            case 'occasion':
                
                dbRecipes = await Recipe.paginate(
                    { occasions: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );
                
                return sendResponse(filter, term, dbRecipes);
        
            default:
                return res.status(200).json({
                    ok: false,
                    message: 'Sorry End Point not found',
                });
        }
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getRecipesByTitleAndAppetizer = async (req: Request, res: Response) =>  {

    const { term }= req.params;
    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };
    const regex = new RegExp(term, 'i');

    try {

         const recipes = await Recipe.paginate(
            { $or: [ { title: regex }, { appetizer: regex } ] , active: true },
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: `Recipes Search result by title and appetizer, term: ${ term }`,   
            recipes,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const getRecipeBySlug = async (req: Request, res: Response) => {

    const { slug } = req.params;

    try {
         const recipe = await Recipe.findOne({ slug, active: true });

        if(!recipe) {
            return res.status(401).json({
                ok: false,
                message: `Recipe with slug: ${ slug } doest not exist`,
            });
        }
        
        return res.status(200).json({
            ok: true,
            message: `Recipe with slug: ${ slug }`,
            recipe,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const postRecipeReview = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { review } = req.body as { review: number };

    try {

        const recipedb = await Recipe.findById({ _id: id, active: true });

        const newReviewValues = [ review, ...recipedb!.reviewValues! ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) / 100 ;

        const recipeReviewUpdated = await Recipe.findByIdAndUpdate(
            { _id: id }, 
            { 
                review: newReview, 
                reviewValues: newReviewValues 
            },
            { new: true },
        );
    
        return res.status(200).json({
            ok: true,
            message: 'Review recipe updated',
            recipe: recipeReviewUpdated,
        });

    } catch (error) {
        sendError(res, error);
    }
}