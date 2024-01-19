import { Request, Response } from 'express';


import { Cocktail, Comment, Post, Recipe, User } from '../models';
import { sendCommentNotification, sendError } from '../helpers';

import { IRequestComment } from '../interfaces';



export const createComment = async ( req: Request, res: Response ) => {

    const { filter } = req.params as { filter: string };
    const { id } = req.query as { id: string };
    const { content, authenticatedUser, record } = req.body as IRequestComment;

    const { _id, userName, email, image } = authenticatedUser!;

    try {

        switch (filter) {

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id, active: true });

                if(!cocktaildb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Cocktail with id: ${ id } does not exist`,
                    });
                }
                
                const newCocktailComment = new Comment({
                    content,
                    cocktail: cocktaildb._id,
                    userId : _id,
                    userName,
                    userAvatar: image,
                    record: [ record ],
                });

                await newCocktailComment.save({ validateBeforeSave: true });

                sendCommentNotification(content, cocktaildb.title, email, userName);

                return res.status(200).json({
                    ok: true,
                    message: 'Comment created successfully',
                    comment: newCocktailComment,
                });
                
            case 'recipe':

                const recipedb = await Recipe.findById({ _id: id, active: true });

                if(!recipedb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Recipe with id: ${ id } does not exist`,
                    });
                }

                const newRecipeComment = new Comment({
                    content,
                    recipe: recipedb._id,
                    userId : _id,
                    userName,
                    userAvatar: image,
                    record: [ record ],
                });

                await newRecipeComment.save({ validateBeforeSave: true });

                sendCommentNotification(content, recipedb.title, email, userName);


                return res.status(200).json({
                    ok: true,
                    message: 'Comment created successfully',
                    comment: newRecipeComment,
                });
                
            
            case 'post':

                const postdb = await Post.findById({ _id: id, active: true });
                
                if(!postdb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Post with id: ${ id } does not exist`,
                    });
                }

                const newPostComment = new Comment({
                    content,
                    post: postdb._id,
                    userId : _id,
                    userName,
                    userAvatar: image,
                    record: [ record ],
                });

                await newPostComment.save({ validateBeforeSave: true });

                sendCommentNotification(content, postdb.title, email, userName);

                return res.status(200).json({
                    ok: true,
                    message: 'Comment created successfully',
                    comment: newPostComment,
                });
                
            default:
                return res.status(401).json({
                    ok: false,
                    message: "Sorry endpoint doesn't exist"
                });
        }

    } catch (error) {
        sendError(res, error);
    }
}

export const updateCommentById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { record } = req.body;

    try {

        const commentdb = await Comment.findById({ _id: id, active: true });

        const commentUpdated = await Comment.findByIdAndUpdate(
          { _id: id },
          {
            active: true,
            record: [ record, ...commentdb!.record ],
          },
          { new: true },  
        );

        return res.status(200).json({
            ok: true,
            message: 'Comment updated successfully',
            comment: commentUpdated,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const deleteCommentById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };
    const { record } = req.body;

    try {
        
        const commentdb = await Comment.findById({ _id: id });

        if( !commentdb!.active ) {
            return res.status(401).json({
                ok: false,
                message: 'Comment already deleted',
            });
        }

        const commentDeleted = await Comment.findByIdAndUpdate(
          { _id: id },
          {
            active: false,
            record: [ record, ...commentdb!.record ],
          },
          { new: true },  
        );

        return res.status(200).json({
            ok: true,
            message: 'Comment deleted successfully',
            comment: commentDeleted,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const getAllComments = async ( req: Request, res: Response ) => {
   
    try {

        const allDbComments = await Comment.find();

        return res.status(200).json({
            ok: true,
            message: 'All Comments',
            comment: allDbComments,
        });
   
    } catch (error) {
        sendError(res, error);
    }
}

export const searchCommentsByFilter = async ( req: Request, res: Response ) => { 

    const { filter } = req.params as { filter: string };
    const { id } = req.query as { id: string };

    try {

        let allDbComments: any;

        switch (filter) {

            case 'cocktail':

                const cocktaildb = await Cocktail.findById({ _id: id, active: true });

                if(!cocktaildb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Cocktail with id: ${ id } does not exist`,
                    });
                }
                
                allDbComments = await Comment.find({ cocktail: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: allDbComments,
                });
             
            case 'recipe':

                const recipedb = await Recipe.findById({ _id: id, active: true });

                if(!recipedb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Recipe with id: ${ id } does not exist`,
                    });
                }

                allDbComments = await Comment.find({ recipe: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: allDbComments,
                });
            
            case 'post':

                const postdb = await Post.findById({ _id: id, active: true });
                
                if(!postdb) {
                    return res.status(401).json({
                        ok: false,
                        message: `Post with id: ${ id } does not exist`,
                    });
                }

                allDbComments = await Comment.find({ post: id, active: true });

                return res.status(200).json({
                    ok: true,
                    message: 'All Comments',
                    comments: allDbComments,
                });
                
            default:
                return res.status(401).json({
                    ok: false,
                    message: "Sorry endpoint doesn't exist"
                });
        }
        
    } catch (error) {
        sendError(res, error);
    }
}
