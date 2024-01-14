import e, { Request, Response } from 'express';

import { Occasion } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createOccasion = async (req: Request, res: Response) => {

    const { name, record } = req.body as IRequestBody;
    
    try {

        let occasionDb = await Occasion.findOne({ name: name.toLocaleLowerCase() });

        if(occasionDb && occasionDb.active) {
            return res.status(401).json({
                ok: false,
                message: `The Occasion ${occasionDb.name} already exist`,
            });
        }

        if(occasionDb && !occasionDb.active) {

            const occasionUpdated = await Occasion.findOneAndUpdate(
                { name }, 
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...occasionDb.record  ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Occasion created: ${ occasionUpdated!.name }`,
                occasion: occasionUpdated,
            });
        }

        const newOccasion = new Occasion({
            ...req.body,
            record: [ record ],
        });

        newOccasion.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Occasion created: ${ newOccasion.name }`,
            occasion: newOccasion,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const updateOccasion = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const occasiondb = await Occasion.findById({ _id: id });

        const updatedOccasion = await Occasion.findByIdAndUpdate(
            { _id: id }, 
            { 
                ...req.body, 
                active: true,
                record: [ record, ...occasiondb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id} updated`,
            occasion: updatedOccasion,
        });
        
    } catch (error) {
       sendError(res, error);
    }
}

export const deleteOccasion = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const occasiondb = await Occasion.findById({ _id: id });

        const deletedOccasion = await Occasion.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...occasiondb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id} deleted`,
            occasion: deletedOccasion,
        });
        
    } catch (error) {
       sendError(res, error);
    }
}

export const getOccasionById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const occasiondb = await Occasion.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id}`,
            occasion: occasiondb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllOccasions = async (_: Request, res: Response) => {

    try {

        const dbOccasions = await Occasion.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Occasions',
            occasions: dbOccasions,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}
