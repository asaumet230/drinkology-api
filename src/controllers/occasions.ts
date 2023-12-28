import { Request, Response } from 'express';

import { Occasion } from '../models';
import { IRequestBody } from '../interfaces';


export const createOccasion = async (req: Request, res: Response) => {

    const { name = '', description = '', record } = req.body as IRequestBody;
    
    try {

        let occasionDb = await Occasion.findOne({ name: name.toLocaleLowerCase() });

        if(occasionDb && occasionDb.active) {
            return res.status(401).json({
                ok: false,
                message: `The Occasion ${occasionDb.name} already exist`,
            });
        }

        if(occasionDb && !occasionDb.active) {

            occasionDb.active = true;
            occasionDb.record = [ record, ...occasionDb.record  ],
            await occasionDb.save();

            return res.status(200).json({
                ok: true,
                message: `Occasion created: ${ occasionDb.name }`,
                occasion: occasionDb,
            });
        }

        const newOccasion = new Occasion({
            name,
            description,
            record: [ record ],
        });

        newOccasion.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Occasion created: ${ newOccasion.name }`,
            occasion: newOccasion,
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

export const updateOccasion = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { name = '', description = '', record } = req.body as IRequestBody;

    try {

        const occasiondb = await Occasion.findById({ _id: id });

        const updatedOccasion = await Occasion.findByIdAndUpdate(
            { _id: id }, 
            { name, description, record: [ record, ...occasiondb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id} updated`,
            occasion: updatedOccasion,
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

export const deleteOccasion = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const occasiondb = await Occasion.findById({ _id: id });

        const deletedOccasion = await Occasion.findByIdAndUpdate(
            { _id: id }, 
            { active: false, record: [ record, ...occasiondb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id} deleted`,
            occasion: deletedOccasion,
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

export const getOccasionById = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };

    try {

        const occasiondb = await Occasion.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Occasion with id: ${id}`,
            occasion: occasiondb,
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

export const getAllOccasions = async (req: Request, res: Response) => {

    try {

        const dbOccasions = await Occasion.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Occasions',
            occasions: dbOccasions,
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
