import { Request, Response } from 'express';


export const createCocktail = ( req: Request, res: Response ) => {


    try {

        return res.status(200).json({
            ok: true,
            cocktail: req.body,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }

}