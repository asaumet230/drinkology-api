import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';


import { Appetizer, Cocktail, Comment, Post, User } from '../models';
import { sendCommentNotification, sendError } from '../helpers';

import { IRequestComment } from '../interfaces';


const responseMessage = ( res: Response, ok: boolean, status: number, message: string ) => res.status(status).json({
        ok: `${ok}`,
        message: `${message}`,
    });

export const createComment = async ( req: Request, res: Response ) => {

    const { 
        content,
        post = '', 
        appetizer = '', 
        cocktail = '', 
        userAuthenticatedId,
        record 
    } = req.body as IRequestComment;

    try {

        if( !post && !appetizer && !cocktail ) 
            responseMessage(
                res, 
                false, 
                401,
                'At least one id is needed',
            );

        if( post && post.length > 1 && !isValidObjectId(post) ) 
            responseMessage(
                res, 
                false, 
                401,
                `Not valid post id: ${post}`,
            );

        if( appetizer && appetizer.length > 1 && !isValidObjectId(appetizer) ) 
            responseMessage(
                res, 
                false, 
                401,
                `Not valid appetizer id: ${appetizer}`,
            );

        if( cocktail && cocktail.length > 1 && !isValidObjectId(cocktail) ) 
            responseMessage(
                res, 
                false, 
                401,
                `Not valid cocktail id: ${cocktail}`,
            );

        const user = await User.findById({ _id: userAuthenticatedId });

        if( post && isValidObjectId(post) ) {

            const postdb = await Post.findById({ _id: post });

            sendCommentNotification( content, postdb!.title, user!.email, user!.userName );

            const comment = new Comment({ 
                ...req.body, 
                user: userAuthenticatedId,
                userName: user!.userName,
                userAvatar: user!.image,
                record: [ record ], 
            });

            await comment.save();

            return responseMessage(
                res, 
                true, 
                200, 
                'Successfully created comment needs approval, by the administrator',
            );
        }

        if( appetizer && isValidObjectId(appetizer) ) {

            const appetizerdb = await Appetizer.findById({ _id: appetizer });

            sendCommentNotification( content, appetizerdb!.title, user!.email, user!.userName );

            const comment = new Comment({ 
                ...req.body, 
                user: userAuthenticatedId,
                userName: user!.userName,
                userAvatar: user!.image,
                record: [ record ], 
            });

            await comment.save();

            return responseMessage(
                res, 
                true, 
                200, 
                'Successfully created comment needs approval, by the administrator',
            );

        }

        if( cocktail && isValidObjectId(cocktail) ) {

            const cocktaildb = await Cocktail.findById({ _id: cocktail });

            sendCommentNotification( content, cocktaildb!.title, user!.email, user!.userName );

            const comment = new Comment({ 
                ...req.body, 
                user: userAuthenticatedId,
                userName: user!.userName,
                userAvatar: user!.image,
                record: [ record ],  
            });

            await comment.save();

            return responseMessage(
                res, 
                true, 
                200, 
                'Successfully created comment needs approval, by the administrator',
            );

        }

    } catch (error) {
        sendError(res, error);
    }

}

export const updateCommentById = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { record } = req.body;

    try {

        const commentdb = await Comment.findById({ _id: id });

        if(!commentdb) 
            return responseMessage(res, false, 401, `Comment doest not exist with id: ${ id }`);
        
        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: id }, 
            { active: true, record: [ record, ...commentdb!.record ] }, 
            { new: true }
        );

        return responseMessage(res, true, 200, `Successfully approval comment with id: ${ updatedComment!._id }`);

    } catch (error) {
        sendError(res, error);
    }
}

export const deleteCommentById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };

    try {
        
        await Comment.findByIdAndDelete({ _id: id });
        return responseMessage(res, true, 200, `Successfully delete comment with id: ${ id }`);

    } catch (error) {
        sendError(res, error);
    }
}

export const getCommentById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    
    try {

        const commentdb = await Comment.findById({ _id: id });

        return res.status(200).json({
            ok: true,
            message: `Comment with id: ${ id }`,
            comment: commentdb, 
        });

        
    } catch (error) {
        sendError(res, error);
    }

}

export const searchCommentsByFilter = async ( req: Request, res: Response ) => { 

    const { filter } = req.params as { filter: string };
    const { id } = req.query as { id: string };

    try {

        switch (filter) {

            case 'post':

                const postdb = await Post.findById({ _id: id });

                if(!postdb || !postdb.active) {
                    return res.status(401).json({
                        ok: false,
                        message: 'Post with id doest not exist',
                    });
                }

                const postComments = await Comment.find({ post: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: postComments,
                });
                
            case 'appetizer':

                const appetizerdb = await Appetizer.findById({ _id: id });

                if(!appetizerdb || !appetizerdb.active) {
                    return res.status(401).json({
                        ok: false,
                        message: 'Appetizer with id doest not exist',
                    });
                }

                const appetizerComments = await Comment.find({ appetizer: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: appetizerComments,
                });

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id });

                if(!cocktaildb || !cocktaildb.active) {
                    return res.status(401).json({
                        ok: false,
                        message: 'Cocktail with id doest not exist',
                    });
                }

                const cocktailsComments = await Comment.find({ cocktail: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: cocktailsComments,
                });
        
            default:
                return res.status(401).json({
                    ok: false,
                    message: 'No comments were found',
                });
        }
        
    } catch (error) {
        sendError(res, error);
    }

}
