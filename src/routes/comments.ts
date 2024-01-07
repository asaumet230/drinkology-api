import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    createComment, 
    deleteCommentById, 
    getCommentById, 
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


// get Comment By Id: 
commentsRouter.get('/:id', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(commentExist),
        fieldValidator, 
    ],  getCommentById,
);

// delete Comment By Id
commentsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(commentExist),
        fieldValidator,
    ],  deleteCommentById,
);

// update Comment By Id
commentsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        fieldValidator,
    ],  updateCommentById,
);

// create Comment:
commentsRouter.post('/', [
        jwtValidator,
        recordGenerator,
        check('content', 'Content is required').notEmpty().isLength({ min: 8, max: 2000 }),
        fieldValidator,
    ],  createComment,
);

// Search Comments By Filter "post, appetizer and cocktail":
commentsRouter.get('/search-comments/:filter', [
        jwtValidator,
        check('id', 'Id is not valid').isMongoId(),
        fieldValidator,
    ],  searchCommentsByFilter,
);

export default commentsRouter;