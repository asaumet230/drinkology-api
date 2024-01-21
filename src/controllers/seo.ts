import { Request, Response } from 'express';

import { 
    Appetizer, 
    Cocktail, 
    Flavor, 
    Occasion, 
    Post, 
    Recipe,
    Seo,
    Tag,
} from '../models';

import { sendError } from '../helpers';
import { IRequestSeo, ITag } from '../interfaces';

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
    const { authenticatedUser, canonical, tags, record } = req.body as IRequestSeo;

    try {

        const seodb = await Seo.findOne({ canonical });

        if(seodb && !seodb.active) {

            const seoUpdated = await Seo.findOneAndUpdate(
                { canonical },
                {
                    ...req.body,
                    active: true,
                    robots: true,
                    record: [ record, ...seodb.record ],
                },
                { new: true },
            );
            
           return sendResponse(res, 200, true, 'Seo successfully created', seoUpdated);
        }

        let newSeo: any;
        let tagsDb: any;
        let tagsNames: any;
         
        switch (filter) {

            case 'post':

                const postdb = await Post.findById({ _id: id, active: true });

                if(!postdb) {
                    return sendResponse(res, 401, false,`Post with id: ${ id } does not exist`);
                }

                if(!tags || tags.length < 1) {
                    return sendResponse(res, 401, false, 'Tags are required');
                }

                tagsDb = await Tag.find({ active: true }); 

                tagsNames = tagsDb.map( (tag: ITag) => tag.name );
                
                for ( const tag of tags ) {
            
                    if(!tagsNames.includes(tag.toLocaleLowerCase())) {
                        return sendResponse(res, 401, false, `Wrong Tag: ${tag}`);
                    }   
                }
                
                newSeo = new Seo({ 
                    ...req.body,
                    post: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });

                await newSeo.save();

                return sendResponse(res, 200, true,'Seo successfully created', newSeo);
               

            case 'appetizer':

                const appetizerdb = await Appetizer.findById({ _id: id, active: true });

                if(!appetizerdb) {
                   return sendResponse(res, 401, false,`Appetizer with id: ${ id } does not exist`);
                }
                
                if(tags!.length > 0) {
                    return sendResponse(res, 401, false, 'Tags are not required');
                }

                newSeo = new Seo({ 
                    ...req.body,
                    appetizer: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });
              
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'flavor':

                const flavordb = await Flavor.findById({ _id: id, active: true });
                
                if(!flavordb) {
                   return sendResponse(res, 401, false,`Flavor with id: ${ id } does not exist`);
                } 

                if(tags!.length > 0) {
                    return sendResponse(res, 401, false, 'Tags are not required');
                }

                newSeo = new Seo({ 
                    ...req.body,
                    flavor: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });
                
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);
                
            case 'occasion':

                const occasiondb = await Occasion.findById({ _id: id, active: true });
                
                if(!occasiondb) {
                   return sendResponse(res, 401, false,`Occasion with id: ${ id } does not exist`);
                }

                if(tags!.length > 0) {
                    return sendResponse(res, 401, false, 'Tags are not required');
                }

                newSeo = new Seo({ 
                    ...req.body,
                    occasion: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });
                
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id, active: true });

                if(!cocktaildb) {
                    return sendResponse(res, 401, false,`Cocktail with id: ${ id } does not exist`);
                } 

                if(!tags || tags.length < 1) {
                    return sendResponse(res, 401, false, 'Tags are required');
                }

                tagsDb = await Tag.find({ active: true }); 

                tagsNames = tagsDb.map( (tag: ITag) => tag.name );
                
                for ( const tag of tags ) {
            
                    if(!tagsNames.includes(tag.toLocaleLowerCase())) {
                        return sendResponse(res, 401, false, `Wrong Tag: ${tag}`);
                    }   
                }
            
                newSeo = new Seo({ 
                    ...req.body,
                    cocktail: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });

                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'recipe':

                const recipedb = await Recipe.findById({ _id: id, active: true });

                if(!recipedb) {
                    return sendResponse(res, 401, false,`Recipe with id: ${ id } doens't exist`);
                }  

                if(!tags || tags.length < 1) {
                    return sendResponse(res, 401, false, 'Tags are required');
                }

                tagsDb = await Tag.find({ active: true }); 

                tagsNames = tagsDb.map( (tag: ITag) => tag.name );
                
                for ( const tag of tags ) {
            
                    if(!tagsNames.includes(tag.toLocaleLowerCase())) {
                        return sendResponse(res, 401, false, `Wrong Tag: ${tag}`);
                    }   
                }

                newSeo = new Seo({ 
                    ...req.body,
                    recipe: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                }); 
                
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);

            case 'tag':

                const tagdb = await Tag.findById({ _id: id, active: true });
                
                if(!tagdb) {
                   return sendResponse(res, 401, false,`Tag with id: ${ id } does not exist`);
                }

                if(tags!.length > 0) {
                    return sendResponse(res, 401, false, 'Tags are not required');
                }

                newSeo = new Seo({ 
                    ...req.body,
                    tag: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });
                
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);
            
            case 'category':

                const categorydb = await Tag.findById({ _id: id, active: true });
                
                if(!categorydb) {
                   return sendResponse(res, 401, false,`Category with id: ${ id } does not exist`);
                }

                if(tags!.length > 0) {
                    return sendResponse(res, 401, false, 'Tags are not required');
                }

                newSeo = new Seo({ 
                    ...req.body,
                    catgory: id,
                    user: authenticatedUser!._id,
                    record: [ record ],
                });
                
                await newSeo.save();

                return sendResponse(res, 200, true, 'Seo successfully created', newSeo);
        
            default: 
                return sendResponse(res, 401, false, 'Sorry endpoint does not exist');
        }

    } catch (error) {
        sendError(res, error);
    }
}

export const updateSeo = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { tags, record } = req.body as IRequestSeo;

    try {

        const seodb = await Seo.findById({ _id: id, active: true });

        if(tags && tags.length > 0) {

            const tagsDb = await Tag.find({ active: true }); 
    
            const tagsNames = tagsDb.map( (tag: ITag) => tag.name );
            
            for ( const tag of tags ) {
        
                if(!tagsNames.includes(tag.toLocaleLowerCase())) {
                    return sendResponse(res, 401, false, `Wrong Tag: ${tag}`);
                }   
            }
        }

        const seoUpdated = await Seo.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
                active: true,
                canonical: seodb!.canonical,
                record: [ record, ...seodb!.record ],
            },
            { new: true },
        );
        
        return sendResponse(res, 200, true, `Seo with id: ${ id } successfully updated`, seoUpdated);

    } catch (error) {
        sendError(res, error);
    }
}

export const deleteSeo = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestSeo;

    try {

        const seodb = await Seo.findById({ _id: id, active: true });

        const seoDeleted = await Seo.findByIdAndUpdate(
            { _id: id },
            {
                active: false,
                robots: false,
                record: [ record, ...seodb!.record ],
            },
            { new: true },
        );
        
        return sendResponse(res, 200, true, `Seo with id: ${ id } successfully deleted`, seoDeleted);

    } catch (error) {
        sendError(res, error);
    }
}

export const getSeoById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const seodb = await Seo.findById({ _id: id, active: true });
        
        return sendResponse(res, 200, true, `Seo with id: ${ id }`, seodb);

    } catch (error) {
        sendError(res, error);
    }
}

export const getAllSeos = async (req: Request, res: Response) => {

    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };

    try {

        const AllSeosdb = await Seo.paginate(
            {},
            { limit: Number(limit), page: Number(page) },
        );
        
        return sendResponse(res, 200, true, 'All Seos', AllSeosdb);

    } catch (error) {
        sendError(res, error);
    }
}

export const getSeoByTitleAndCanonical = async (req: Request, res: Response) => {

    const { term }= req.params;
    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };
    const regex = new RegExp(term, 'i');

    try {

        const seos = await Seo.paginate(
            { $or: [ { title: regex }, { canonical: regex } ] , active: true },
            { limit: Number(limit), page: Number(page) },
        );

       return sendResponse(res, 200, true, `Seo description search result by title and canonical, term: ${ term }`, seos);

    } catch (error) {
        sendError(res, error);
    }
} 

export const getSeoByFilterAndId = async (req: Request, res: Response) => {

    const { filter }= req.params as { filter: string };
    const { id } = req.query as { id: string };

    try {

        let seodb: any;
        
        switch (filter) {

            case 'post':

                const postdb = await Post.findById({ _id: id, active: true });

                if(!postdb) {
                    return sendResponse(res, 401, false,`Post with id: ${ id } does not exist`);
                }

                seodb = await Seo.findOne({ post: id, active: true });

                if(!seodb) {
                    return sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                    return sendResponse(res, 200, true, 'Seo description', seodb);
                }

            case 'appetizer':

                const appetizerdb = await Appetizer.findById({ _id: id, active: true });

                if(!appetizerdb) {
                    return sendResponse(res, 401, false,`Appetizer with id: ${ id } does not exist`);
                } 

                seodb = await Seo.findOne({ appetizer: id, active: true });

                if(!seodb){
                    return sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                    return sendResponse(res, 200, true, 'Seo description', seodb);
                }

            case 'flavor':

                const flavordb = await Flavor.findById({ _id: id, active: true });

                if(!flavordb) {
                    return sendResponse(res, 401, false,`Flavor with id: ${ id } does not exist`);
                } 

                seodb = await Seo.findOne({ appetizer: id, active: true });

                if(!seodb){
                    return sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                    return sendResponse(res, 200, true, 'Seo description', seodb);
                }

            case 'occasion':

                const occasiondb = await Occasion.findById({ _id: id, active: true });
                    
                if(!occasiondb) {
                    return sendResponse(res, 401, false,`Occasion with id: ${ id } does not exist`);
                } 
                
                seodb = await Seo.findOne({ occasion: id, active: true });

                if(!seodb) {
                    return sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                    return sendResponse(res, 200, true, 'Seo description', seodb);
                }

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id, active: true });

                if(!cocktaildb) {
                    return sendResponse(res, 401, false,`Cocktail with id: ${ id } does not exist`);
                }

                seodb = await Seo.findOne({ cocktail: id, active: true });

                if(!seodb)  {
                    return sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                    return sendResponse(res, 200, true, 'Seo description', seodb);
                }
                
            case 'recipe':

                const recipedb = await Recipe.findById({ _id: id, active: true });

                if(!recipedb) {
                    return sendResponse(res, 401, false,`Recipe with id: ${ id } doens't exist`);
                }

                seodb = await Seo.findOne({ recipe: id, active: true });

                if(!seodb) {
                   return  sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                   return  sendResponse(res, 200, true, 'Seo description', seodb);
                }
                
            case 'tag':

                const tagdb = await Tag.findById({ _id: id, active: true });

                if(!tagdb) {
                    return sendResponse(res, 401, false,`Tag with id: ${ id } doens't exist`);
                }

                seodb = await Seo.findOne({ recipe: id, active: true });

                if(!seodb) {
                   return  sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                   return  sendResponse(res, 200, true, 'Seo description', seodb);
                }

            case 'category':

                const categorydb = await Tag.findById({ _id: id, active: true });

                if(!categorydb) {
                    return sendResponse(res, 401, false,`Category with id: ${ id } doens't exist`);
                }

                seodb = await Seo.findOne({ recipe: id, active: true });

                if(!seodb) {
                   return  sendResponse(res, 401, false,'Seo description does not exist');
                } else {
                   return  sendResponse(res, 200, true, 'Seo description', seodb);
                }

            default:
                return sendResponse(res, 401, false, 'Sorry endpoint does not exist');
        }

    } catch (error) {
        sendError(res, error);
    }


}