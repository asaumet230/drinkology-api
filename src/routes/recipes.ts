import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { 
    isAppetizerValid, 
    limitValidator, 
    occasionsValidator, 
    pageValidator, 
    recipeExist, 
    reviewValidator, 
    tagsValidator
} from '../helpers';

import { 
    createRecipe, 
    deleteRecipe, 
    getAllRecipes, 
    getRecipeById, 
    getRecipeBySlug, 
    getRecipesByFilterAndTerm, 
    getRecipesByTitleAndAppetizer, 
    postRecipeReview, 
    updateRecipe, 
} from '../controllers';


export const recipesRouter = Router();

// Create Recipe:
recipesRouter.post('/', [
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
        check('servings', 'Servings is required').notEmpty(),
        check('servingSuggestions', 'Serving Suggestions is required').notEmpty().isArray(),
        check('preparationTime', 'Preparation Time is required').notEmpty(),
        check('cookingTime', 'Cooking Time Time is required').notEmpty(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('tips', 'Tips is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        check('appetizer', 'Appetizer is required').notEmpty(),
        check('appetizer').custom(isAppetizerValid),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createRecipe,
);

// Update Recipe By Id:
recipesRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(recipeExist),
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
        check('servings', 'Servings is required').notEmpty(),
        check('servingSuggestions', 'Serving Suggestions is required').notEmpty().isArray(),
        check('preparationTime', 'Preparation Time is required').notEmpty(),
        check('cookingTime', 'Cooking Time Time is required').notEmpty(),
        check('instructions', 'Instructions is required').notEmpty().isArray(),
        check('tips', 'Tips is required').notEmpty().isArray(),
        check('images', 'Images is required').notEmpty().isArray(),
        check('recommendations', 'Recommendations is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        check('appetizer', 'Appetizer is required').notEmpty(),
        check('appetizer').custom(isAppetizerValid),
        check('occasions', 'Occasions is required').notEmpty().isArray(),
        check('occasions').custom(occasionsValidator),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateRecipe,
);

// Delete Recipe By Id
recipesRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(recipeExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteRecipe,
);

// Get Recipe By Id
recipesRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(recipeExist),
        fieldValidator,
    ],  getRecipeById,
);

// Get All Recipes:
recipesRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getAllRecipes,
);

// Get Recipes By Filter "Title, Appetizer, Occasion" & Search Term:
recipesRouter.get('/search/:filter', [
        check('filter', 'Filter is required').notEmpty(),
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getRecipesByFilterAndTerm,
); 

// Get Recipes By Title And Appetizer:
recipesRouter.get('/search/title-appetizer/:term', [
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getRecipesByTitleAndAppetizer
);

// Get Recipe Slug:
recipesRouter.get('/slug/:slug', [
        check('slug', 'Slug is required').notEmpty(),
        fieldValidator,
    ],  getRecipeBySlug,
);

// Post User Review:
recipesRouter.post('/review/:id', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(recipeExist),
        check('review', 'review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        fieldValidator,
    ],  postRecipeReview,
);


export default recipesRouter;