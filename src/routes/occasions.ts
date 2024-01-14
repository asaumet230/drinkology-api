import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    deleteOccasion,
    getAllOccasions, 
    getOccasionById, 
    updateOccasion,
    createOccasion
} from '../controllers';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { occasionExist } from '../helpers';


export const ocassionsRouter = Router();


// get All Ocassions:
ocassionsRouter.get('/', getAllOccasions);

// get Ocassion By Id: 
ocassionsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(occasionExist),
        fieldValidator,
    ],  getOccasionById,
);

// delete Ocassion By Id:
ocassionsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(occasionExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteOccasion,
);

// update Ocassion By Id
ocassionsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(occasionExist),
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateOccasion,
);

// create Ocassion:
ocassionsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createOccasion,
);

export default ocassionsRouter;