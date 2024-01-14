import { Request, Response } from 'express';

import { 
    Appetizer, 
    Cocktail, 
    Flavor, 
    Occasion, 
    Post, 
    Recipe,
    Seo,
} from '../models';

import { sendError } from '../helpers';
import { IRequestRecipe } from '../interfaces';

const sendResponse = (res: Response, status: number, ok: boolean, message: string, seo?: any) => { 

    return res.status(status).json({
        ok,
        message,
        seo,
    });

}

export const createSeo = async (req: Request, res: Response) => {

    const { filter } = req.params as { filter: string };
    const { id } = req.query as { id: string };
    const { userAuthenticatedId, record } = req.body  as IRequestRecipe;

    try {

        let newSeo;

        switch (filter) {

            case 'post':

                const postdb = await Post.findById({ _id: id, active: true });

                if(!postdb) 
                    sendResponse(res, 401, false,`Post with id: ${ id } doens't exist`);

                newSeo = new Seo({ 
                    ...req.body,
                    post: postdb!._id,
                    user: userAuthenticatedId,
                    record: [ record ],
                });

                await newSeo.save();

                await Post.findByIdAndUpdate(
                    { _id: id },
                    { seo: newSeo._id }
                );

                return sendResponse(res, 200, true,'Seo successfully created', newSeo);
               

            case 'appetizer':

                const appetizerdb = await Appetizer.findById({ _id: id, active: true });

                if(!appetizerdb)  
                    sendResponse(res, 401, false,`Appetizer with id: ${ id } doens't exist`);

                newSeo = new Seo({ 
                    ...req.body,
                    appetizer: appetizerdb!._id,
                    user: userAuthenticatedId,
                    record: [ record ],
                });
              
                await newSeo.save();

                await Appetizer.findByIdAndUpdate(
                    { _id: id },
                    { seo: newSeo._id }
                );

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'flavor':

                const flavordb = await Flavor.findById({ _id: id, active: true });
                
                if(!flavordb)  
                    sendResponse(res, 401, false,`Flavor with id: ${ id } doens't exist`);

                newSeo = new Seo({ 
                    ...req.body,
                    flavor: flavordb!._id,
                    user: userAuthenticatedId,
                    record: [ record ],
                });
                
                await newSeo.save();

                await Flavor.findByIdAndUpdate(
                    { _id: id },
                    { seo: newSeo._id }
                );

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);
                
            case 'occasion':

                const occasiondb = await Occasion.findById({ _id: id, active: true });
                
                if(!occasiondb)  
                    sendResponse(res, 401, false,`Occasion with id: ${ id } doens't exist`);

                newSeo = new Seo({ 
                    ...req.body,
                    occasion: occasiondb!._id,
                    user: userAuthenticatedId,
                    record: [ record ],
                });
                
                await newSeo.save();

                await Occasion.findByIdAndUpdate(
                    { _id: id },
                    { seo: newSeo._id }
                );

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id, active: true });

                if(!cocktaildb)  
                    sendResponse(res, 401, false,`Cocktail with id: ${ id } doens't exist`);

                newSeo = new Seo({ 
                    ...req.body,
                    cocktail: cocktaildb!._id,
                    user: userAuthenticatedId,
                    record: [ record ],
                });

                await newSeo.save();
                
                await Cocktail.findByIdAndUpdate(
                    { _id: id },
                    { seo: newSeo._id }
                );

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'recipe':

                const recipedb = await Recipe.findById({ _id: id, active: true });

                if(!recipedb)  
                    sendResponse(res, 401, false,`Recipe with id: ${ id } doens't exist`);

                    newSeo = new Seo({ 
                        ...req.body,
                        recipe: recipedb!._id,
                        user: userAuthenticatedId,
                        record: [ record ],
                    }); 
                    
                    await newSeo.save();

                    await Recipe.findByIdAndUpdate(
                        { _id: id },
                        { seo: newSeo._id }
                    );    
    
                    return sendResponse(res, 200, true, 'Seo successfully created', newSeo);
        
            default:
                return res.status(401).json({
                    ok: false,
                    message: "Sorry endpoint doesn't exist",
                });
        }

    } catch (error) {
        sendError(res, error);
    }
    
}