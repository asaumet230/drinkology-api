import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    createComment, 
    deleteCommentById, 
    getAllComments, 
    searchCommentsByFilter, 
    updateCommentById, 
} from '../controllers';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator, 
} from '../middlewares';

import { commentExist } from '../helpers';

export const commentsRouter = Router();

// Get All Comment By Id: 
commentsRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        fieldValidator, 
    ],  getAllComments,
);

// Delete Comment By Id
commentsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(commentExist),
        fieldValidator,
    ],  deleteCommentById,
);

// Update Comment By Id
commentsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(commentExist),
        fieldValidator,
    ],  updateCommentById,
);

// Create Comment:
commentsRouter.post('/:filter', [
        jwtValidator,
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('content', 'Content is required').notEmpty().isLength({ min: 10, max: 800 }),
        fieldValidator,
    ],  createComment,
);

// Search All Comments By Filter "post, recipe and cocktail":
commentsRouter.get('/search-comments/:filter', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        fieldValidator,
    ],  searchCommentsByFilter,
);

export default commentsRouter;