import { Router } from 'express';
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
    tagsValidator,
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

// Create Cocktail:
cocktailsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('title', 'Title is required').notEmpty(),
        check('review', 'Review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        check('slug', 'Slug is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('history', 'History is required').notEmpty(),
        check('tools', 'Tools is required').notEmpty().isArray(),
        check('ingredients', 'Ingredients is required').notEmpty().isArray(),
        check('calories', 'Calories is required').notEmpty(),
        check('quantity', 'Quantity is required').notEmpty(),
        check('glass', 'Glass is required').notEmpty(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        check('flavor', 'Flavor is required').notEmpty(),
        check('flavor').custom(flavorValidator),
        check('spirits', 'Spirits is required').notEmpty().isArray(),
        check('spirits').custom(spiritsValidator),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createCocktail,
);

// Update Cocktail By Id:
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
        check('description', 'Description is required').notEmpty(),
        check('history', 'History is required').notEmpty(),
        check('tools', 'Tools is required').notEmpty().isArray(),
        check('ingredients', 'Ingredients is required').notEmpty().isArray(),
        check('calories', 'Calories is required').notEmpty(),
        check('quantity', 'Quantity is required').notEmpty(),
        check('glass', 'Glass is required').notEmpty(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        check('flavor', 'Flavor is required').notEmpty(),
        check('flavor').custom(flavorValidator),
        check('spirits', 'Spirits is required').notEmpty().isArray(),
        check('spirits').custom(spiritsValidator),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updatedCocktail,
);

// Delete Cocktail By Id
cocktailsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteCocktail,
);

// Get Cocktail By Id
cocktailsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        fieldValidator,
    ],  getCocktailById,
);

// Get All Cocktails:
cocktailsRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getAllCocktails, 
);

// Get Cocktails By Filter: "Title, Spirit, Occasion, Flavor" & Search Term:
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

// Get Cocktails By Title And Spirit:
cocktailsRouter.get('/search/title-spirit/:term', [
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getCocktailsByTitleAndSpirit,
);

// Get Cocktail Slug:
cocktailsRouter.get('/slug/:slug', [
        check('slug', 'Slug is required').notEmpty(),
        fieldValidator,
    ],  getCocktailBySlug,
);

// Post User Review:
cocktailsRouter.post('/review/:id', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(cocktailExist),
        check('review', 'review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        fieldValidator,
    ],  postCocktailReview,
);

export default cocktailsRouter;