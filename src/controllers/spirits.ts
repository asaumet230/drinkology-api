import { Request, Response } from 'express';

import { Spirit } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createSpirit = async (req: Request, res: Response) => {

    const { name, record } = req.body as IRequestBody;
    
    try {

        let spiritDb = await Spirit.findOne({ name: name.toLocaleLowerCase().trim() });

        if(spiritDb && spiritDb.active) {
            return res.status(401).json({
                ok: false,
                message: `The spirit ${spiritDb.name} already exist`,
            });
        }

        if(spiritDb && !spiritDb.active) {

            const spiritUpdated = await Spirit.findOneAndUpdate(
                { name },
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...spiritDb.record  ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Appetizer created: ${ spiritUpdated!.name }`,
                spirit: spiritUpdated,
            });
        }

        const newSpirit = new Spirit({
            ...req.body,
            record: [ record ],
        });

        newSpirit.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Spirit created: ${ newSpirit.name }`,
            spirit: newSpirit,
        });

    } catch (error) {
      sendError(res, error);
    }
}

export const updateSpirit = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const spiritdb = await Spirit.findById({ _id: id });

        const updatedSpirit = await Spirit.findByIdAndUpdate(
            { _id: id }, 
            { 
                ...req.body, 
                active: true,
                record: [ record, ...spiritdb!.record ],
            }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Spirit with id: ${id} updated`,
            spirit: updatedSpirit,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteSpirit = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const spiritdb = await Spirit.findById({ _id: id });

        const deletedSpirit = await Spirit.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...spiritdb!.record ], 
            }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Spirit with id: ${id} deleted`,
            spirit: deletedSpirit,
        });
        
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getSpiritById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const spiritdb = await Spirit.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Spirit with id: ${id}`,
            spirit: spiritdb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllSpirits = async (req: Request, res: Response) => {

    try {

        const dbSpirits = await Spirit.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Spirits',
            spirits: dbSpirits,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}
