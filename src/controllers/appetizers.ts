import { Request, Response } from 'express';

import { Appetizer } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createAppetizer = async (req: Request, res: Response) =>  {

    const { name, record } = req.body as IRequestBody;

    try {

        let appetizerdb = await Appetizer.findOne({ name: name.toLowerCase().trim() });

        if(appetizerdb && appetizerdb.active) {

            return res.status(401).json({
                ok: false,
                message: `The appetizer ${appetizerdb.name} already exist`,
            });
        }

        if(appetizerdb && !appetizerdb.active) {

            const appetizerUpdated = await Appetizer.findOneAndUpdate(
                { name },
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...appetizerdb.record  ],
                },
                { new: true },
            );
          

            return res.status(200).json({
                ok: true,
                message: `Appetizer created: ${ appetizerUpdated!.name }`,
                appetizer: appetizerUpdated,
            });
        }

        const newAppetizer = new Appetizer({
            ...req.body,
            record: [ record ]
        });

        newAppetizer.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Appetizer created: ${ newAppetizer.name }`,
            appetizer: newAppetizer,
        });
   

    } catch (error) {
        sendError(res, error);
    }
}

export const updateAppetizer = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const appetizerdb = await Appetizer.findById({ _id: id });

        const updatedAppetizer = await Appetizer.findByIdAndUpdate(
            { _id: id }, 
            {   
                ...req.body,
                active: true, 
                record: [ record, ...appetizerdb!.record ] }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id} updated`,
            appetizer: updatedAppetizer,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteAppetizer = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const appetizerdb = await Appetizer.findById({ _id: id });

        const deletedAppetizer = await Appetizer.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...appetizerdb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id} deleted`,
            appetizer: deletedAppetizer,
        });
        
        
    } catch (error) {
       sendError(res, error);
    }

}

export const getAppetizerById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const appetizerdb = await Appetizer.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id}`,
            appetizer: appetizerdb,
        });
        
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getAllAppetizers = async (_: Request, res: Response) => {

    try {

        const dbAppetizers = await Appetizer.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Appetizers',
            appetizers: dbAppetizers,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}