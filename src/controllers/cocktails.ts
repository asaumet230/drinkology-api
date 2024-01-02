import { Request, Response } from 'express';


import { Cocktail } from '../models';
import { IRequestCocktails } from '../interfaces';


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
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
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
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }
}

export const deleteCocktail = async ( req: Request, res: Response ) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IRequestCocktails;

    try {

        const cocktaildb = await Cocktail.findById({ _id: id });

        const cocktailUpdated = await Cocktail.findByIdAndUpdate(
            { _id: id },
            { active: false, record: [ record, ...cocktaildb!.record ] },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Cocktail with id: ${id} deleted`,
            cocktail: cocktailUpdated,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
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
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }
}

export const getAllCocktails = async ( req: Request, res: Response ) => {

    try {

        const allCocktails = await Cocktail.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Cocktails',
            cocktails: allCocktails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }
}