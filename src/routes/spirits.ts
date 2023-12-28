import { Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { 
    createSpirit, 
    deleteSpirit, 
    getAllSpirits, 
    getSpiritById, 
    updateSpirit,
} from '../controllers';

import { spiritExist } from '../helpers';

export const spiritRouter = Router();


// get All Spirits:
spiritRouter.get('/', getAllSpirits);

// get Spirit By Id:
spiritRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(spiritExist),
        fieldValidator
    ], getSpiritById
);

// delete Spirit By Id
spiritRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(spiritExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteSpirit,
);

// update Spirit By Id
    spiritRouter.put('/:id', [ 
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(spiritExist),
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateSpirit,
);

// create Spirit
spiritRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ], createSpirit,
);

export default spiritRouter;


