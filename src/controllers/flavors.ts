import { Request, Response } from 'express';

import { Flavor } from '../models';
import { IRequestBody } from '../interfaces';


export const createFlavor = async (req: Request, res: Response) => {

    const { name = '', description = '', record } = req.body as IRequestBody;
    
    try {

        let flavorDb = await Flavor.findOne({ name: name.toLocaleLowerCase() });

        if(flavorDb && flavorDb.active) {
            return res.status(401).json({
                ok: false,
                message: `The flavor ${flavorDb.name} already exist`,
            });
        }

        if(flavorDb && !flavorDb.active) {

            flavorDb.active = true;
            flavorDb.record = [ record, ...flavorDb.record  ],
            await flavorDb.save();

            return res.status(200).json({
                ok: true,
                message: `Flavor created: ${ flavorDb.name }`,
                flavor: flavorDb,
            });
        }

        const newFlavor = new Flavor({
            name,
            description,
            record: [ record ],
        });

        newFlavor.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Flavor created: ${ newFlavor.name }`,
            flavor: newFlavor,
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

export const updateFlavor = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { name = '', description = '', record } = req.body as IRequestBody;

    try {

        const flavordb = await Flavor.findById({ _id: id });

        const updatedFlavor = await Flavor.findByIdAndUpdate(
            { _id: id }, 
            { name, description, record: [ record, ...flavordb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id} updated`,
            flavor: updatedFlavor,
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

export const deleteFlavor = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const flavordb = await Flavor.findById({ _id: id });

        const deletedFlavor = await Flavor.findByIdAndUpdate(
            { _id: id }, 
            { active: false, record: [ record, ...flavordb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id} deleted`,
            flavor: deletedFlavor,
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

export const getFlavorById = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };

    try {

        const flavordb = await Flavor.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id}`,
            flavor: flavordb,
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

export const getAllFlavors = async (req: Request, res: Response) => {

    try {

        const dbFlavors = await Flavor.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Flavors',
            flavors: dbFlavors,
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
