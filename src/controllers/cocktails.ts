import { Request, Response } from 'express';

import { Cocktail } from '../models';
import { sendError } from '../helpers';
import { IRequestCocktails } from '../interfaces';


export const createCocktail = async ( req: Request, res: Response ) => {

    const { title, review, record } = req.body as IRequestCocktails;

    try {

        let cocktaildb = await Cocktail.findOne({ title:  title.toLocaleLowerCase() });

        if(cocktaildb && cocktaildb.active) {
            return res.status(401).json({
                ok: false,
                message: `The cocktail: ${cocktaildb.title}, already exist`,
            });
        }

        if(cocktaildb && !cocktaildb.active) {


            const cocktailUpdated = await Cocktail.findOneAndUpdate(
                { title },
                {
                    ...req.body,
                    active: true,
                    reviewValues: [ review ],
                    record: [ record, ...cocktaildb.record ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Cocktail created: ${ cocktailUpdated!.title }`,
                cocktail: cocktailUpdated,
            });
        }

        const newCocktail = new Cocktail({
            ...req.body,
            reviewValues: [ review ],
            record: [ record ],
        });

        await newCocktail.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Cocktail created: ${ newCocktail.title }`,
            cocktail: newCocktail,
        });

    } catch (error) {
       sendError(res, error);
    }

}

export const updatedCocktail = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { review, record } = req.body as IRequestCocktails;

    try {

        const cocktaildb = await Cocktail.findById({ _id: id, active: true });

        const newReviewValues = [ review, ...cocktaildb!.reviewValues! ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) / 100 ;

        const cocktailUpdated = await Cocktail.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
                active: true,
                review: newReview,
                reviewValues: newReviewValues,
                record: [ record, ...cocktaildb!.record ],
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id} updated`,
            cocktail: cocktailUpdated,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteCocktail = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestCocktails;

    try {

        const cocktaildb = await Cocktail.findById({ _id: id, active: true });

        const cocktailDeleted = await Cocktail.findByIdAndUpdate(
            { _id: id },
            { 
                active: false, 
                record: [ record, ...cocktaildb!.record ] 
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id} deleted`,
            cocktail: cocktailDeleted,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getCocktailById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };

    try {

        const cocktaildb = await Cocktail.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id}`,
            cocktail: cocktaildb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllCocktails = async ( req: Request, res: Response ) => {

    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };

    try {

        const allCocktails = await Cocktail.paginate(
            { }, 
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: 'All Cocktails',
            cocktails: allCocktails,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const getCocktailsByFilterAndTerm = async ( req: Request, res: Response ) => {
    
    const { filter } = req.params as { filter: string };
    const { term, limit = 10, page = 1 } = req.query as { term: string, limit: string, page: string };

    const regex = new RegExp(term, 'i');

    const sendResponse = ( filter: string, term: string, cocktails: any ) => {

        return res.status(200).json({
            ok: true,
            message: `All Cocktails by filter: ${ filter } & term: ${ term }`,   
            cocktails,
        });
    }

    try {

        let dbCocktails: any;

        switch (filter) {
    
            case 'title':

                dbCocktails = await Cocktail.paginate(
                    { title: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );

                return sendResponse(filter, term, dbCocktails);
    
            case 'spirit':

                dbCocktails = await Cocktail.paginate(
                    { spirits: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );

                return sendResponse(filter, term, dbCocktails);
    
            case 'occasion':

                dbCocktails = await Cocktail.paginate(
                    { occasions: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );

                return sendResponse(filter, term, dbCocktails);
    
            case 'flavor':

                dbCocktails = await Cocktail.paginate(
                    { flavor: regex,  active: true },
                    { limit: Number(limit), page: Number(page) },
                );

                return sendResponse(filter, term, dbCocktails);
    
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

export const getCocktailsByTitleAndSpirit = async ( req: Request, res: Response ) => {

    const { term }= req.params;
    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };
    const regex = new RegExp(term, 'i');

    try {

        const cocktails = await Cocktail.paginate(
            { $or: [ { title: regex }, { spirits: regex } ] , active: true },
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: `Cocktail Search result by title and spirit, term: ${ term }`,   
            cocktails,
        });
        
    } catch (error) {
        sendError(res, error);
    }
} 

export const getCocktailBySlug = async ( req: Request, res: Response ) => {

    const { slug } = req.params;

    try {
        const cocktail = await Cocktail.findOne({ slug, active: true });

        if(!cocktail) {
            return res.status(401).json({
                ok: false,
                message: `Cocktail with slug: ${ slug } doest not exist`,
            });
        }
        
        return res.status(200).json({
            ok: true,
            message: `Cocktail with slug: ${ slug }`,
            cocktail,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const postCocktailReview = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { review } = req.body as { review: number };

    try {

        const cocktaildb = await Cocktail.findById({ _id: id, active: true });

        const newReviewValues = [ review, ...cocktaildb!.reviewValues! ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) / 100 ;

        const cocktailReviewUpdated = await Cocktail.findByIdAndUpdate(
            { _id: id }, 
            { 
                review: newReview, 
                reviewValues: newReviewValues, 
            },
            { new: true },
        );
    
        return res.status(200).json({
            ok: true,
            message: 'Review cocktail updated',
            cocktail: cocktailReviewUpdated,
        });

    } catch (error) {
        sendError(res, error);
    }
}




