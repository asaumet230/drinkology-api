import { Router } from 'express';
import { check } from 'express-validator';

import { activateAccount, changePassword, forgotPassword, login, register } from '../controllers';
import { fieldValidator } from '../middlewares';

export const authRouter = Router();


// Login:
authRouter.post('/login', [
        check('email', 'Email is required').notEmpty(),
        check('email', 'Invalid email format').isEmail(),
        check('password', 'Password is required').notEmpty().isLength({min: 8}),
        fieldValidator
    ], login,
);

// Register:
authRouter.post('/register',
    [
        check('name', 'Name is required').notEmpty(),
        check('lastName', 'Last Name is required').notEmpty(),
        check('email', 'Email is required').notEmpty(),
        check('email', 'Invalid email format').isEmail(),
        check('password', 'Password is required').notEmpty().isLength({min: 8}),
        fieldValidator
    ], register,
);

// Activate Account:
authRouter.post('/activate',
    [ 
        check('verificationCode', 'Verification Code is required').notEmpty(),
        fieldValidator
    ], activateAccount,
);

// Forgot Password:
authRouter.post('/forgot-password',
    [ 
        check('email', 'Email is required').notEmpty(),
        check('email', 'Invalid email format').isEmail(),
        fieldValidator
    ], forgotPassword,
);

// Change Password:
authRouter.post('/change-password',
    [ 
        check('password', 'Password is required').notEmpty().isLength({min: 8}),
        check('changePasswordCode', 'Password Verification Code is required').notEmpty(),
        fieldValidator
    ], changePassword,
);

export default authRouter;