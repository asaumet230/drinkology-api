import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { 
    createPost, 
    deletePost, 
    getAllPosts, 
    getPostById, 
    getPostBySlug, 
    getPostsByTitle, 
    updatePost,
} from '../controllers';

import { 
    isCategoryValid, 
    isPostValid, 
    limitValidator, 
    pageValidator, 
    postExist, 
    reviewValidator, 
    tagsValidator 
} from '../helpers';

export const postsRouter = Router();

// get All Posts:
postsRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getAllPosts
);

// get Post By Id: 
postsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(postExist),
        fieldValidator,
    ],  getPostById,
);

// delete Post By Id
postsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(postExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deletePost,
);

// Update Post By Id:
postsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(postExist),
        check('title', 'Title is required').notEmpty(),
        check('category', 'Category is required').notEmpty(),
        check('category').custom(isCategoryValid),
        check('review', 'Review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        check('slug', 'Slug is required').notEmpty(),
        check('shortDescription', 'Short Description is required').notEmpty(),
        check('content', 'Content is required').notEmpty().isLength({ min: 10, max: 5000 }),
        check('images', 'Images is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        fieldValidator,
    ],  updatePost,
);

// Create Post:
postsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('title', 'Title is required').notEmpty(),
        check('category', 'Category is required').notEmpty(),
        check('category').custom(isCategoryValid),
        check('review', 'Review is required').notEmpty().isNumeric(),
        check('review').custom(reviewValidator),
        check('slug', 'Slug is required').notEmpty(),
        check('shortDescription', 'Short Description is required').notEmpty(),
        check('content', 'Content is required').notEmpty().isLength({ min: 10, max: 5000 }),
        check('images', 'Images is required').notEmpty().isArray(),
        check('tags', 'Tags is required').notEmpty().isArray(),
        check('tags').custom(tagsValidator),
        fieldValidator,
    ],  createPost,
);

// get Post By Slug: 
postsRouter.get('/slug/:slug', [
        check('slug', 'Slug is required').notEmpty(),
        check('slug').custom(isPostValid),
        fieldValidator,
    ],  getPostBySlug,
);

// Search Post By Post title:
postsRouter.get('/search/:term', [
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getPostsByTitle,
);

export default postsRouter;