import { Request, Response } from 'express';

import { Flavor } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createFlavor = async (req: Request, res: Response) => {

    const { name, record } = req.body as IRequestBody;
    
    try {

        let flavorDb = await Flavor.findOne({ name: name.toLocaleLowerCase().trim() });

        if(flavorDb && flavorDb.active) {
            return res.status(401).json({
                ok: false,
                message: `The flavor ${flavorDb.name} already exist`,
            });
        }

        if(flavorDb && !flavorDb.active) {

            const flavorUpdated = await Flavor.findOneAndUpdate(
                { name }, 
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...flavorDb.record  ],
                }, 
                { new: true }
            );

            return res.status(200).json({
                ok: true,
                message: `Flavor created: ${ flavorUpdated!.name }`,
                flavor: flavorUpdated,
            });
        }

        const newFlavor = new Flavor({
            ...req.body,
            record: [ record ],
        });

        newFlavor.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Flavor created: ${ newFlavor.name }`,
            flavor: newFlavor,
        });
   
    } catch (error) {
        sendError(res, error);
    }
}

export const updateFlavor = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const flavordb = await Flavor.findById({ _id: id });

        const updatedFlavor = await Flavor.findByIdAndUpdate(
            { _id: id }, 
            { 
                ...req.body,
                active: true,
                record: [ record, ...flavordb!.record ] }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id} updated`,
            flavor: updatedFlavor,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteFlavor = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const flavordb = await Flavor.findById({ _id: id });

        const deletedFlavor = await Flavor.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...flavordb!.record ] 
            }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id} deleted`,
            flavor: deletedFlavor,
        });  
        
    } catch (error) {
      sendError(res, error);
    }
}

export const getFlavorById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const flavordb = await Flavor.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Flavor with id: ${id}`,
            flavor: flavordb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllFlavors = async (_: Request, res: Response) => {

    try {

        const dbFlavors = await Flavor.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Flavors',
            flavors: dbFlavors,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}
