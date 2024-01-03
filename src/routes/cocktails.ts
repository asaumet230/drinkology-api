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
    limitValidator,
    pageValidator,
 } from '../helpers';

import { 
    createCocktail, 
    deleteCocktail, 
    getAllCocktails, 
    getCocktailById, 
    getCocktailBySlug, 
    getCocktailsByFilterAndTerm, 
    getCocktailsByTitleAndSpirit, 
    postCocktailReview, 
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
cocktailsRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getAllCocktails 
);

// get Cocktails By Filter: "Title, Spirit, Occasion, Flavor" & Search Term:
cocktailsRouter.get('/search/:filter', [
        check('filter', 'Filter is required').notEmpty(),
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getCocktailsByFilterAndTerm,
);

// get Cocktails By Title And Spirit:
cocktailsRouter.get('/search/title-spirit/:term', [
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getCocktailsByTitleAndSpirit,
);

// get Cocktails Slug:
cocktailsRouter.get('/slug/:slug', [
        check('slug', 'Slug is required').notEmpty(),
        fieldValidator
    ],  getCocktailBySlug,
);

// get Cocktails By Title And Spirit:
cocktailsRouter.post('/review/:id', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        check('review', 'review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        fieldValidator
    ],  postCocktailReview,
);

export default cocktailsRouter;