import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import {
    fieldValidator,
    jwtValidator,
    permissionValidator,
    recordGenerator
} from '../middlewares';

import { 
    reviewValidator, 
    spiritsValidator,
    occasionsValidator,
    flavorValidator,
    cocktailExist,
 } from '../helpers';

import { 
    createCocktail, 
    deleteCocktail, 
    getAllCocktails, 
    getCocktailById, 
    updatedCocktail, 
} from '../controllers';

export const cocktailsRouter = Router();

// create Cocktail:
cocktailsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('title', 'Title is required').notEmpty(),
        check('review', 'Review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        check('slug', 'Slug is required').notEmpty(),
        check('history', 'History is required').notEmpty(),
        check('tools', 'Tools is required').notEmpty().isArray(),
        check('ingredients', 'Ingredients is required').notEmpty().isArray(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('flavor', 'Flavor is required').notEmpty(),
        check('flavor').custom(flavorValidator),
        check('spirits', 'Spirits is required').notEmpty().isArray(),
        check('spirits').custom(spiritsValidator),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('seo', 'Seo is required').notEmpty(),
        check('seo.title', 'Seo Title is required').notEmpty(),
        check('seo.description', 'Seo Description is required').notEmpty(),
        check('seo.author', 'Seo Author is required').notEmpty(),
        check('seo.keywords', 'Seo Keywords is required').notEmpty().isArray(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  createCocktail,
);

// update Cocktail By Id:
cocktailsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        check('title', 'Title is required').notEmpty(),
        check('review', 'Review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        check('slug', 'Slug is required').notEmpty(),
        check('history', 'History is required').notEmpty(),
        check('tools', 'Tools is required').notEmpty().isArray(),
        check('ingredients', 'Ingredients is required').notEmpty().isArray(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('flavor', 'Flavor is required').notEmpty(),
        check('flavor').custom(flavorValidator),
        check('spirits', 'Spirits is required').notEmpty().isArray(),
        check('spirits').custom(spiritsValidator),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('seo', 'Seo is required').notEmpty(),
        check('seo.title', 'Seo Title is required').notEmpty(),
        check('seo.description', 'Seo Description is required').notEmpty(),
        check('seo.author', 'Seo Author is required').notEmpty(),
        check('seo.keywords', 'Seo Keywords is required').notEmpty().isArray(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  updatedCocktail,
);

// delete Cocktail By Id
cocktailsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  deleteCocktail,
);

// get Cocktail By Id
cocktailsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        fieldValidator
    ],  getCocktailById,
);

//get All Cocktails:
cocktailsRouter.get('/', getAllCocktails );

// get Cocktails By "Title, Spirit, Occasion, Flavor":
cocktailsRouter.get('/search/:searchType', (req: Request, res: Response) => {

    const { searchType } = req.params as { searchType: string };
    const { title = '', spirit = '', occasion = '', flavor = '' } = req.query;

    switch (searchType) {

        case 'title':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde title',
                title: { title },
                searchType: { searchType },
            });

        case 'spirit':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde spirit',
                spirit: { spirit },
                searchType: { searchType },
            });

        case 'occasion':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde occasion',
                occasion: { occasion },
                searchType: { searchType },
            });

        case 'flavor':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde flavor',
                flavor: { flavor },
                searchType: { searchType },
            });


        default:
            return res.status(200).json({
                ok: false,
                message: 'Sorry End Point not found',
            });
    }

});

// get Cocktails By Title And Spirit:
cocktailsRouter.get('/search/title&spirit/:term', (req: Request, res: Response) => {

    const { term = '' } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde search by title and spirit',
        term: { term },
    });


});


export default cocktailsRouter;