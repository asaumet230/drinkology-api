import { Request, Response } from 'express';

import { Appetizer } from '../models';
import { IRequestBody } from '../interfaces';


export const createAppetizer = async (req: Request, res: Response) =>  {

    const { name = '', description = '', record } = req.body as IRequestBody;

    try {

        let appetizerdb = await Appetizer.findOne({ name: name.toLowerCase() });

        if(appetizerdb && appetizerdb.active) {

            return res.status(401).json({
                ok: false,
                message: `The appetizer ${appetizerdb.name} already exist`,
            });
        }

        if(appetizerdb && !appetizerdb.active) {

            appetizerdb.active = true;
            appetizerdb.record = [ record, ...appetizerdb.record  ],
            await appetizerdb.save();

            return res.status(200).json({
                ok: true,
                message: `Appetizer created: ${ appetizerdb.name }`,
                appetizer: appetizerdb,
            });
        }

        const newAppetizer = new Appetizer({
            name,
            description,
            record: [ record ]
        });

        newAppetizer.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Appetizer created: ${ newAppetizer.name }`,
            appetizer: newAppetizer,
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

export const updateAppetizer = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { name = '', description = '', record } = req.body as IRequestBody;

    try {

        const appetizerdb = await Appetizer.findById({ _id: id });

        const updatedAppetizer = await Appetizer.findByIdAndUpdate(
            { _id: id }, 
            { name, description, record: [ record, ...appetizerdb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id} updated`,
            appetizer: updatedAppetizer,
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

export const deleteAppetizer = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const appetizerdb = await Appetizer.findById({ _id: id });

        const deletedAppetizer = await Appetizer.findByIdAndUpdate(
            { _id: id }, 
            { active: false, record: [ record, ...appetizerdb!.record ] }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id} deleted`,
            appetizer: deletedAppetizer,
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

export const getAppetizerById = async (req: Request, res: Response) => {

    const { id = '' } = req.params as { id: string };

    try {

        const appetizerdb = await Appetizer.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Appetizer with id: ${id}`,
            appetizer: appetizerdb,
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


export const getAllAppetizers = async (req: Request, res: Response) => {

    try {

        const dbAppetizers = await Appetizer.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Appetizers',
            appetizers: dbAppetizers,
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