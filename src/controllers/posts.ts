import { Request, Response } from 'express';

import { Post } from '../models';

import { sendError } from '../helpers'
import { IRequestPost } from '../interfaces';


export const createPost = async (req: Request, res: Response) => {

    const { title, review, record } = req.body as IRequestPost;

    try {

        let postdb = await Post.findOne({ title:  title.toLocaleLowerCase() });

        if(postdb && postdb.active) {
            return res.status(401).json({
                ok: false,
                message: `The post: ${postdb.title}, already exist`,
            });
        }

        if(postdb && !postdb.active) {

            const postUpdated = await Post.findOneAndUpdate(
                { title },
                {
                    ...req.body,
                    active: true,
                    reviewValues: [ review ],
                    record: [ record, ...postdb.record ],
                },
                { new: true },
            );

            return res.status(200).json({
                ok: true,
                message: `Post created: ${ postUpdated!.title }`,
                post: postUpdated,
            });
        }

        const newPost = new Post({
            ...req.body,
            reviewValues: [ review ],
            record: [ record ],
        });

        await newPost.save({ validateBeforeSave: true });

        return res.status(200).json({
            ok: true,
            message: `Post created: ${ newPost.title }`,
            post: newPost,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const updatePost = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { review, record } = req.body as IRequestPost;

    try {
        
        const postdb = await Post.findById({ _id: id, active: true });

        const newReviewValues = [ review, ...postdb!.reviewValues! ];
        const sumReviews = newReviewValues.reduce((total, review) => total + review , 0 );
        const newReview = Math.round(( sumReviews / newReviewValues.length ) * 100) / 100 ;

        const postUpdated = await Post.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
                active: true,
                review: newReview,
                reviewValues: newReviewValues,
                record: [ record, ...postdb!.record ],
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Post with id: ${id} updated`,
            post: postUpdated,
        });

    } catch (error) {
        sendError(res, error);
    }
}

export const deletePost = async (req: Request, res: Response) => {

    const { id } = req.params as { id: string };
    const { record } = req.body as IRequestPost;

    try {

        const postdb = await Post.findById({ _id: id, active: true });

        const postDeleted = await Post.findByIdAndUpdate(
            { _id: id },
            { 
                active: false, 
                record: [ record, ...postdb!.record ] 
            },
            { new: true },
        );

        return res.status(200).json({
            ok: true,
            message: `Post with id: ${id} deleted`,
            post: postDeleted,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getPostById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };

    try {

        const postdb = await Post.findById({ _id: id, active: true });

        return res.status(200).json({
            ok: true,
            message: `Post with id: ${id}`,
            post: postdb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}

export const getPostBySlug = async ( req: Request, res: Response ) => {

    const { slug } = req.params as { slug: string };

    try {

        const postdb = await Post.findOne({ slug, active: true });

        return res.status(200).json({
            ok: true,
            message: `Post with id: ${slug}`,
            post: postdb,
        });
        
    } catch (error) {
        sendError(res, error);
    }
}


export const getAllPosts = async ( req: Request, res: Response ) => {

    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };

    try {

        const allPosts = await Post.paginate(
            { }, 
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: 'All Posts',
            posts: allPosts,
        });

    } catch (error) {
        sendError(res, error);
    }
}


export const getPostsByTitle = async ( req: Request, res: Response ) => {

    const { term }= req.params;
    const { limit = 10, page = 1 } = req.query as { limit: string, page: string };
    const regex = new RegExp(term, 'i');

    try {

        const posts = await Post.paginate(
            { title: regex  , active: true },
            { limit: Number(limit), page: Number(page) },
        );

        return res.status(200).json({
            ok: true,
            message: `Post Search result by title, term: ${ term }`,   
            posts: posts,
        });
        
    } catch (error) {
        sendError(res, error);
    }
} 