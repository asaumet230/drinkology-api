import { Request, Response } from 'express';


import { Cocktail } from '../models';
import { IRequestCocktails } from '../interfaces';


const sendError = ( res: Response, error: any ) => {

    console.error(error);
    return res.status(500).json({
        ok: false,
        message: 'Error contact the administrator',
        error: `Error: ${ error }`
    });
}

export const createCocktail = async ( req: Request, res: Response ) => {

    const { title, record } = req.body as IRequestCocktails;

    try {

        let cocktaildb = await Cocktail.findOne({ title:  title.toLocaleLowerCase() });

        if(cocktaildb && cocktaildb.active) {
            return res.status(401).json({
                ok: false,
                message: `The cocktail: ${cocktaildb.title}, already exist`,
            });
        }

        if(cocktaildb && !cocktaildb.active) {

            cocktaildb.active = true;
            cocktaildb.record = [ record, ...cocktaildb.record  ],
            await cocktaildb.save();

            return res.status(200).json({
                ok: true,
                message: `Cocktail created: ${ cocktaildb.title }`,
                cocktail: cocktaildb,
            });
        }

        const newCocktail = new Cocktail({
           ...req.body,
            record: [ record ]
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

    const { id = '' } = req.params as { id: string };

    const { record } = req.body as IRequestCocktails;

    try {

        const cocktaildb = await Cocktail.findById({ _id: id });

        const cocktailUpdated = await Cocktail.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
                record: [ record, ...cocktaildb!.record ]
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

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as { record:{ userId: string, userName: string } };

    try {

        const cocktaildb = await Cocktail.findById({ _id: id });

        const cocktailDeleted = await Cocktail.findByIdAndUpdate(
            { _id: id },
            { active: false, record: [ record, ...cocktaildb!.record ] },
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

    const { id = '' } = req.params as { id: string };

    try {

        const cocktaildb = await Cocktail.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id}`,
            cocktail: cocktaildb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

//admin end point
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
            { $or: [ { title: regex }, { spirit: regex } ] , active: true },
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
        const cocktail = await Cocktail.findOne({ slug });

        if(!cocktail || !cocktail.active) {
            return res.status(401).json({
                ok: false,
                message: `Cocktail with slug: ${ slug } don't exist`,
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

        const cocktaildb = await Cocktail.findById({ _id: id });

        const newReviewValues = [ ...cocktaildb!.reviewValues!, review ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) /100 ;

        const cocktailReviewUpdated = await Cocktail.findByIdAndUpdate(
            { _id: id }, 
            { review: newReview, reviewValues: newReviewValues },
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
 
//* CREATE COMMENTS END POINTS
//* OPTIMIZAR LO QUE MAS PUEDA