import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    changePasswordRegularUser,
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    updateNotAdminUser, 
    updateUser 
} from '../controllers';

import { 
    fieldValidator, 
    haveSameId, 
    jwtValidator, 
    permissionValidator,
    recordGenerator 
} from '../middlewares';

import { isRoleValid, userExist } from '../helpers';


export const usersRouter = Router();

// get All Users:
usersRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role']),
        fieldValidator,
    ],  getAllUsers,
);

// get User By Id: 
usersRouter.get('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(userExist),
        fieldValidator,
    ],  getUserById,
);

// delete User By Id
usersRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(userExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteUser,
);

// update User By Id
usersRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(userExist),
        check('name', 'Name is require').notEmpty(),
        check('lastName', 'Last name is require').notEmpty(),
        check('email', 'Email is require').notEmpty(),
        check('email', 'Is not a valid Email').isEmail(),
        check('role', 'Role is require').notEmpty(),
        check('role').custom(isRoleValid),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateUser,
);

// create User:
usersRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('name', 'Name is require').notEmpty(),
        check('lastName', 'Last name is require').notEmpty(),
        check('email', 'Email is require').notEmpty(),
        check('email', 'Is not a valid Email').isEmail(),
        check('password', 'The password must have a minimum of 8 characters').isLength({ min: 8 }).notEmpty(),
        check('role', 'Role is require').notEmpty(),
        check('role').custom(isRoleValid),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ], createUser,
);

// Update Not Admin User:
usersRouter.put('/update-profile/:id', [
        jwtValidator,
        haveSameId,
        permissionValidator(['user_role', 'sales_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(userExist),
        check('name', 'Name is require').notEmpty(),
        check('lastName', 'Last name is require').notEmpty(),
        check('image', 'Image is require').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateNotAdminUser,
);

// Change Password Regular User:
usersRouter.put('/update-password/:id', [
        jwtValidator,
        haveSameId,
        permissionValidator(['user_role', 'sales_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(userExist),
        check('password', 'The password must have a minimum of 8 characters').isLength({ min: 8 }).notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  changePasswordRegularUser,
);

// TODO: FALTA QUE EL USUARIO QUE NO SEA ADMIN PUEDA OBTENER SU INFORMACIÓN CON SU ID.

export default usersRouter;