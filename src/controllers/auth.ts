import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models';
import { generarJWT, sendVerificationEmail } from '../helpers';

import { IUserBody } from '../interfaces';

type LoginBody = {
    email    : string,
    password : string,
}

export const login = async (req: Request, res: Response) => {

    const { password, email } = req.body as LoginBody;

    try {

        const userDb = await User.findOne({ email: email.toLocaleLowerCase() });

        if(!userDb || !userDb.active) {
            return res.status(401).json({
                ok: false,
                message: `Email: ${email} not found`,
            });
        }

        const passwordValidation = bcrypt.compareSync(password, userDb.password);
        
        if(!passwordValidation) {
            return res.status(401).json({
                ok: false,
                message: `Invalid user or password`,
            });
        }

        const token = await generarJWT(userDb._id.toString());

        return res.status(200).json({
            ok: true,
            token,
            user: {
                id: userDb._id,
                name: userDb.name,
                lastName: userDb.lastName,
                email: userDb.email,
                image: userDb.image,
                role: userDb.role,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }

}

export const register = async (req: Request, res: Response) => {

    const { name, lastName, email, password } = req.body as IUserBody;

    try {

        let user = await User.findOne({ email });

        if(user && user.active) {
            return res.status(401).json({
                ok: false,
                message: `User with email: ${email} already exist`,
            });
        }

        const salt = bcrypt.genSaltSync();
        const verificationCode = uuidv4().split('-')[0];
        const subject: string = 'Drinkology: verification Code to active your account';

        if(user && !user.active) {
            user.name = name;
            user.lastName = lastName;
            user.verificationCode = verificationCode;
            user.password = bcrypt.hashSync(password, salt);
            await user.save({ validateBeforeSave: true });
            await sendVerificationEmail(email, verificationCode, subject);

            return res.status(200).json({
                ok: true,
                message: 'Successfully created user, user must active',
                verificationCode,
                user: {
                    id: user._id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                },
            });
        }

        user = new User({
            name,
            lastName,
            email,
            verificationCode,
            active: false,
        });

        user.password = bcrypt.hashSync(password, salt);
        user.record = [ {
            userId: '',
            userName: email,
        }];

        await user.save({ validateBeforeSave: true });
        await sendVerificationEmail(email, verificationCode, subject);

        return res.status(200).json({
            ok: true,
            message: 'Successfully created user, user must active',
            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                role: user.role,
            },
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }
}

export const activateAccount = async (req: Request, res: Response) => {

    const { verificationCode } = req.body as { verificationCode: string };

    try {

        const user = await User.findOne({ verificationCode });

        if(!user) {
            return res.status(400).json({
                ok: false,
                message: `Invalid Code: ${ verificationCode }`
            });
        }

        if(user && user.active) {
            return res.status(400).json({
                ok: false,
                message: `User with email: ${ user.email } is already active`
            });
        }

        if(user.verificationCode === 'user active') {
            return res.status(400).json({
                ok: false,
                message: `Invalid Code: ${ verificationCode }`
            });
        }

        user.active = true;
        user.verificationCode = 'user active';
        await user.save({ validateBeforeSave: true });

        return  res.status(200).json({
            ok: true,
            message: `User with email: ${ user.email } was activated`,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }

}

export const forgotPassword = async (req: Request, res: Response) => {

    const { email } = req.body  as { email: string };

    try {
        const userDb = await User.findOne({ email: email.toLocaleLowerCase() });

        if(!userDb || !userDb.active) {
            return res.status(401).json({
                ok: false,
                message: `Email: ${email} not found`,
            });
        }


        const changePasswordCode = uuidv4().split('-')[0];
        userDb.changePasswordCode = changePasswordCode;
        const subject: string = 'Drinkology: verification Code to change your password';

        await userDb.save({ validateBeforeSave: true });
        await sendVerificationEmail(email, changePasswordCode, subject);

        return res.status(200).json({
            ok: true,
            message: 'We have sent a verification code to your email',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }
}

export const changePassword = async (req: Request, res: Response) => {

    const { changePasswordCode, password } = req.body as { changePasswordCode: string, password: string };

    try {

        const user = await User.findOne({ changePasswordCode });

        if(!user || !user.active) {
            return res.status(400).json({
                ok: false,
                message: `Invalid Code: ${ changePasswordCode }`
            });
        }


        if(user.changePasswordCode === 'code used') {
            return res.status(400).json({
                ok: false,
                message: `Invalid Code: ${ changePasswordCode }`
            });
        }

        const passwordValidation = bcrypt.compareSync(password, user.password);
        
        if(passwordValidation) {
            return res.status(401).json({
                ok: false,
                message: 'It cannot be a password that you have already used',
            });
        }

        user.changePasswordCode = 'code used';
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save({ validateBeforeSave: true });

        return  res.status(200).json({
            ok: true,
            message: 'Successful password changed',
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error contact the administrator',
            error: `Error: ${ error }`
        });
    }

}

