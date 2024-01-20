import { Router } from 'express';
import { check } from 'express-validator';

import { 
    fieldValidator,
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { 
    createSeo, 
    deleteSeo, 
    getAllSeos, 
    getSeoByFilterAndId, 
    getSeoById, 
    getSeoByTitleAndCanonical, 
    updateSeo } from '../controllers';

import { 
    isCanonicalValid, 
    limitValidator, 
    pageValidator, 
    seoExist 
} from '../helpers';

export const seoRouter = Router();

// get All SEO:
seoRouter.get('/', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getAllSeos,
);

// get SEO By Id: 
seoRouter.get('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(seoExist),
        fieldValidator,
    ],  getSeoById,
);

// delete SEO By Id
seoRouter.delete('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(seoExist),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  deleteSeo,
);

// update SEO By Id
seoRouter.put('/:id', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(seoExist),
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('robots', 'Robots is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  updateSeo,
);

// create SEO:
seoRouter.post('/:filter', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('canonical', 'Canonical is required').notEmpty(),
        check('canonical').custom(isCanonicalValid),
        check('robots', 'Robots is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator,
    ],  createSeo,
);

// Search SEO by "Title & Canonical":
seoRouter.get('/search/title-canonical/:term', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        check('term', 'Term is required').notEmpty(),
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getSeoByTitleAndCanonical,
);

// Search SEO by "Filter & Id of Filter":
seoRouter.get('/search/:filter', [
        check('limit', 'Limit is required').notEmpty(),
        check('limit').custom(limitValidator),
        check('page', 'Page is required').notEmpty(),
        check('page').custom(pageValidator),
        fieldValidator,
    ],  getSeoByFilterAndId,
);


export default seoRouter;