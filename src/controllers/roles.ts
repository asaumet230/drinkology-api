import { Request, Response } from 'express';

import { Role } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createRole = async (req: Request, res: Response) =>  {

    const { name, record } = req.body as IRequestBody;

    try {

        let roledb = await Role.findOne({ name: name.toLowerCase().trim() });

        if(roledb && roledb.active) {

            return res.status(401).json({
                ok: false,
                message: `The Role ${roledb.name} already exist`,
            });
        }

        if(roledb && !roledb.active) {

            const roleUpdated = await Role.findOneAndUpdate(
                { name },
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...roledb.record ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Role created: ${ roleUpdated!.name }`,
                role: roleUpdated,
            });
        }

        const newRole = new Role({
            ...req.body,
            record: [ record ],
        });

        newRole.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Appetizer created: ${ newRole.name }`,
            role: newRole,
        });

    } catch (error) {
        sendError(res, error);
    }

}

export const updateRole = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const roledb = await Role.findById({ _id: id, active: true });

        const updatedRole = await Role.findByIdAndUpdate(
            { _id: id }, 
            { 
                ...req.body, 
                active: true,
                record: [ record, ...roledb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id} updated`,
            role: updatedRole,
        });
        
    } catch (error) {
      sendError(res, error);
    }
}

export const deleteRole = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const roledb = await Role.findById({ _id: id, active: true });

        const deletedRole = await Role.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...roledb!.record ],
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id} deleted`,
            role: deletedRole,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getRoleById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const roledb = await Role.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id}`,
            role: roledb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllRoles = async (req: Request, res: Response) => {

    try {

        const dbRoles = await Role.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Roles',
            roles: dbRoles,
        });
        
    } catch (error) {
       sendError(res, error);
    }

}