import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    createFlavor,
    deleteFlavor,
    getAllFlavors, 
    getFlavorById, 
    updateFlavor
} from '../controllers';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { flavorExist } from '../helpers';

export const flavorsRouter = Router();

// get All Flavors:
flavorsRouter.get('/', getAllFlavors);

// get Flavor By Id: 
flavorsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(flavorExist),
        fieldValidator
    ],  getFlavorById,
);

// delete Flavor By Id
flavorsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(flavorExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator, 
    ],  deleteFlavor,
);

// update Flavor By Id
flavorsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(flavorExist),
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateFlavor,
);

// create Flavor:
flavorsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createFlavor,
);

export default flavorsRouter;