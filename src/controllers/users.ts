import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { IUserBody } from '../interfaces';
import { sendError } from '../helpers';


export const createUser = async (req: Request, res: Response) => {

    const { email= '', password = '', record } = req.body as IUserBody;

    try {

        let user = await User.findOne({ email });

        if(user && user.active) {
            return res.status(401).json({
                ok: false,
                message: `User with email: ${email} already exist`,
            });
        }

        const salt = bcrypt.genSaltSync();

        if(user && !user.active) {
            user.active = true;
            user.password = bcrypt.hashSync(password, salt);
            user.record = [ record, ...user.record ];
            await user.save({ validateBeforeSave: true });

            return res.status(200).json({
                ok: true,
                message: 'Successfully created user',
                user: user,
            });
        }
       
        user = new User(req.body);
        user.password = bcrypt.hashSync(password, salt);
        user.record = [ record ];
        await user.save({ validateBeforeSave: true });
        
        return res.status(200).json({
            ok: true,
            message: 'Successfully created user',
            user: user
        });
        
    } catch (error) {
       sendError(res, error);
    }
}

export const updateUser = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { password, record } = req.body as IUserBody;

    try {

        const userDb = await User.findById({_id: id});
       
        if(password) {
            const salt = bcrypt.genSaltSync();
            const newPassword = bcrypt.hashSync(password, salt);

            const updatedUser = await User.findByIdAndUpdate(
                { _id: id }, 
                { 
                    ...req.body,
                    password: newPassword,
                    record: [ record, ...userDb!.record ] 
                }, 
                { new: true }
            );

            return res.status(200).json({
                ok: true,
                message: `User with id: ${id} updated`,
                user: updatedUser,
            });
    
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id }, 
            { 
                ...req.body,
                record: [ record, ...userDb!.record ] 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `User with id: ${id} updated`,
            user: updatedUser,
        });
        
    } catch (error) {
        sendError(res, error);
    }
    
    

}

export const deleteUser = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IUserBody;

    try {

        const userDb = await User.findById({_id: id});

        const deleteUser = await User.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false,
                record: [ record, ...userDb!.record ] 
            }, 
            { new: true }
        );
        
        return res.status(200).json({
            ok: true,
            message: `User with id: ${id} deleted`,
            user: deleteUser,
        });

    } catch (error) {
       sendError(res, error);
    }

}

export const getUserById = async (req: Request, res: Response) => {

    const { id = ''} = req.params as { id: string };

    try {

        const user  = await User.findById({_id: id});

        return res.status(200).json({
            ok: true,
            message: `User with id: ${id}`,
            user,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getAllUsers = async (req: Request, res: Response) => {
    
    try {
        
        const users  = await User.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Users',
            users,
        });
    } catch (error) {
        sendError(res, error);
    }
}

export const updateNotAdminUser = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { name, lastName, image, socialMediaNetworks, record } = req.body as IUserBody;

    try {

        const userDb = await User.findById({_id: id});

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id }, 
            { 
                name, 
                lastName,
                image,
                socialMediaNetworks, 
                record: [ record, ...userDb!.record ] 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `User with id: ${id} updated`,
            user: {
                id: updatedUser!._id,
                name: updatedUser!.name,
                lastName: updatedUser!.lastName,
                email: updatedUser!.email,
                image: updatedUser!.image,
                role: updatedUser!.role,
                socialMediaNetworks: updatedUser!.socialMediaNetworks,
            },
        });

        
    } catch (error) {
        sendError(res, error);
    }

}

export const changePasswordRegularUser = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { password, record } = req.body as IUserBody;

    try {

        const userDb = await User.findById({_id: id});
        const salt = bcrypt.genSaltSync();

        await User.findByIdAndUpdate(
            { _id: id }, 
            { 
                password: bcrypt.hashSync(password, salt),
                record: [ record, ...userDb!.record ] 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: 'Succesful password change',
        });
        

        
    } catch (error) {
        sendError(res, error);
    }

}

// TODO: FALTA QUE EL USUARIO QUE NO SEA ADMIN PUEDA OBTENER SU INFORMACIÓN CON SU ID.