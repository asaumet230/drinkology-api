import { Router } from 'express';
import { check } from 'express-validator';

import { 
    createTag,
    deleteTag,
    getAllTags, 
    getTagById, 
    getTagsByName, 
    updateTag
} from '../controllers';

import { 
    fieldValidator, 
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { tagExist } from '../helpers';


export const tagsRouter = Router();


// Get All Tags:
tagsRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        fieldValidator,
    ],  getAllTags,
);

// Get Tag By Id: 
tagsRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(tagExist),
        fieldValidator,
    ],  getTagById,
);

// Delete Tag By Id:
tagsRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(tagExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteTag,
);

// Update Tag By Id
tagsRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(tagExist),
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('slug', 'Slug is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateTag,
);

// Create Tag:
tagsRouter.post('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('name', 'Name is required').notEmpty(),
        check('title', 'Title is required').notEmpty(),
        check('slug', 'Slug is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('image', 'Image is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createTag,
);

// Search Tag By Name:
tagsRouter.get('/search/:term', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('term', 'Term is required').notEmpty(),
        fieldValidator,
    ],  getTagsByName,
);


export default tagsRouter;