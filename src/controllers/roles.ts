import { Request, Response } from 'express';

import { Role } from '../models';
import { IRequestBody } from '../interfaces';


export const createRole = async (req: Request, res: Response) =>  {

    const { name = '', description = '' , record } = req.body as IRequestBody;

    try {

        let roledb = await Role.findOne({ name: name.toLowerCase() });

        if(roledb && roledb.active) {

            return res.status(401).json({
                ok: false,
                message: `The Role ${roledb.name} already exist`,
            });
        }

        if(roledb && !roledb.active) {

            roledb.active = true;
            roledb.record = [ record, ...roledb.record  ],
            await roledb.save();

            return res.status(200).json({
                ok: true,
                message: `Role created: ${ roledb.name }`,
                role: roledb,
            });
        }

        const newRole = new Role({
            name,
            description,
            record: [ record ]
        });

        newRole.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Appetizer created: ${ newRole.name }`,
            role: newRole,
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

export const updateRole = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { name = '', description = '', record } = req.body as IRequestBody;


    try {

        const roledb = await Role.findById({ _id: id });

        const updatedRole = await Role.findByIdAndUpdate(
            { _id: id }, 
            { name, description, record: [ record, ...roledb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id} updated`,
            role: updatedRole,
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

export const deleteRole = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const roledb = await Role.findById({ _id: id });

        const deletedRole = await Role.findByIdAndUpdate(
            { _id: id }, 
            { active: false, record: [ record, ...roledb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id} deleted`,
            role: deletedRole,
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

export const getRoleById = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };

    try {

        const roledb = await Role.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Role with id: ${id}`,
            role: roledb,
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

export const getAllRoles = async (req: Request, res: Response) => {

    try {

        const dbRoles = await Role.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Roles',
            roles: dbRoles,
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