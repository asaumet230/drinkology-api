import { Router } from 'express';
import { check } from 'express-validator';

import { 
    createAppetizer, 
    deleteAppetizer, 
    updateAppetizer, 
    getAppetizerById,
    getAllAppetizers,
 } from '../controllers/appetizers';

import {
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { appetizerExist } from '../helpers';

export const appetizersRouter = Router();


// get All Appetizers:
appetizersRouter.get('/', getAllAppetizers);

// get Appetizer By Id: 
appetizersRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(appetizerExist),
        fieldValidator
    ],  getAppetizerById
);

// Delete Appetizer By Id
appetizersRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(appetizerExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  deleteAppetizer
);

// Update Appetizer By Id
appetizersRouter.put('/:id',[ 
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(appetizerExist),
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  updateAppetizer
);

// Create Appetizer:
appetizersRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ], createAppetizer
);

export default appetizersRouter;