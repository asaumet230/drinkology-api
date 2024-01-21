import { Router } from 'express';
import { check } from 'express-validator';

import {
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { 
    createCategory,
    deleteCategory,
    getAllCategories, 
    getCategoryById, 
    updateCategory,
} from '../controllers';

import { categoryExist } from '../helpers';

export const categoriesRouter = Router();


// Get All Categories:
categoriesRouter.get('/', getAllCategories);

// Get Category By Id: 
categoriesRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(categoryExist),
        fieldValidator,
    ],  getCategoryById,
);

// Delete Category By Id
categoriesRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(categoryExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteCategory,
);

// Update Appetizer By Id
categoriesRouter.put('/:id',[ 
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(categoryExist),
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('slug', 'Slug is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateCategory,
);

// Create Appetizer:
categoriesRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('slug', 'Slug is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createCategory,
);

export default categoriesRouter;