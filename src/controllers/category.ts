import { Request, Response } from 'express';

import { Category } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createCategory = async (req: Request, res: Response) =>  {

    const { name, record } = req.body as IRequestBody;

    try {

        let categorydb = await Category.findOne({ name: name.toLowerCase().trim() });

        if(categorydb && categorydb.active) {

            return res.status(401).json({
                ok: false,
                message: `The category ${categorydb.name} already exist`,
            });
        }

        if(categorydb && !categorydb.active) {

            const categoryUpdated = await Category.findOneAndUpdate(
                { name },
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...categorydb.record  ],
                },
                { new: true },
            );
          

            return res.status(200).json({
                ok: true,
                message: `Category created: ${ categoryUpdated!.name }`,
                category: categoryUpdated,
            });
        }

        const newCategory = new Category({
            ...req.body,
            record: [ record ],
        });

        newCategory.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Category created: ${ newCategory.name }`,
            category: newCategory,
        });
   
    } catch (error) {
        sendError(res, error);
    }
}

export const updateCategory = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const categorydb = await Category.findById({ _id: id, active: true });

        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: id }, 
            {   
                ...req.body,
                active: true, 
                record: [ record, ...categorydb!.record ] }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Category with id: ${id} updated`,
            category: updatedCategory,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteCategory = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const categorydb = await Category.findById({ _id: id, active: true });

        const deletedCategory = await Category.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...categorydb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Category with id: ${id} deleted`,
            category: deletedCategory,
        });
        
    } catch (error) {
       sendError(res, error);
    }

}

export const getCategoryById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const categorydb = await Category.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Category with id: ${id}`,
            category: categorydb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getAllCategories = async (_: Request, res: Response) => {

    try {

        const dbCategories = await Category.find({ active: true });

        return res.status(200).json({
            ok: true,
            message: 'All Appetizers',
            categories: dbCategories,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}