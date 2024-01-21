import { Request, Response } from 'express';

import { Tag } from '../models';
import { sendError } from '../helpers';
import { IRequestBody } from '../interfaces';


export const createTag = async (req: Request, res: Response) =>  {

    const { name, record } = req.body as IRequestBody;

    try {

        let tagdb = await Tag.findOne({ name: name.toLowerCase().trim() });

        if(tagdb && tagdb.active) {

            return res.status(401).json({
                ok: false,
                message: `The tag ${tagdb.name} already exist`,
            });
        }

        if(tagdb && !tagdb.active) {

            const tagUpdated = await Tag.findOneAndUpdate(
                { name },
                {
                    ...req.body,
                    active: true,
                    record: [ record, ...tagdb.record  ],
                },
                { new: true },
            );
          

            return res.status(200).json({
                ok: true,
                message: `Tag created: ${ tagUpdated!.name }`,
                tag: tagUpdated,
            });
        }

        const newTag = new Tag({
            ...req.body,
            record: [ record ],
        });

        newTag.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Tag created: ${ newTag.name }`,
            tag: newTag,
        });

    } catch (error) {
        sendError(res, error);
    }

}

export const updateTag = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const tagdb = await Tag.findById({ _id: id, active: true });

        const updatedTag = await Tag.findByIdAndUpdate(
            { _id: id }, 
            {   
                ...req.body,
                active: true, 
                record: [ record, ...tagdb!.record ] }, 
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Tag with id: ${id} updated`,
            tag: updatedTag,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const deleteTag = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestBody;

    try {

        const tagdb = await Tag.findById({ _id: id, active: true });

        const deletedTag = await Tag.findByIdAndUpdate(
            { _id: id }, 
            { 
                active: false, 
                record: [ record, ...tagdb!.record ], 
            }, 
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: `Tag with id: ${id} deleted`,
            tag: deletedTag,
        });
        
    } catch (error) {
       sendError(res, error);
    }
}

export const getTagById = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };

    try {

        const tagdb = await Tag.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Tag with id: ${id}`,
            tag: tagdb,
        });
        
    } catch (error) {
        sendError(res, error);
    }

}

export const getAllTags = async (_: Request, res: Response) => {

    try {

        const dbAllTags = await Tag.find();

        return res.status(200).json({
            ok: true,
            message: 'All Tags',
            tags: dbAllTags,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getTagsByName = async ( req: Request, res: Response ) => {

    const { term }= req.params;
    const regex = new RegExp(term, 'i');

    try {

        const tags = await Tag.find( { name: regex, active: true } );

        return res.status(200).json({
            ok: true,
            message: `Tag Search result by name and title, term: ${ term }`,   
            tags,
        });
        
    } catch (error) {
        sendError(res, error);
    }
} 