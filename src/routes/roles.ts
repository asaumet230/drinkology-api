import { Router } from 'express';
import { check } from 'express-validator';

import { 
    createRole, 
    deleteRole, 
    getAllRoles, 
    getRoleById, 
    updateRole } from '../controllers';
    
import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { roleExist } from '../helpers';

export const rolesRouter = Router();

// get All Roles:
rolesRouter.get('/',[
        jwtValidator,
        permissionValidator(['admin_role']),
        fieldValidator,
    ],  getAllRoles,
);

// get Role By Id: 
rolesRouter.get('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(roleExist),
        fieldValidator,
    ],  getRoleById,
);

// delete Role By Id
rolesRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(roleExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteRole,
);

// Update Role By Id
rolesRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(roleExist),
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateRole,
);

// Create Role:
rolesRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createRole,
);

export default rolesRouter;