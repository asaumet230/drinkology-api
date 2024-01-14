import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { 
    fieldValidator,
    jwtValidator, 
    permissionValidator, 
    recordGenerator 
} from '../middlewares';

import { createSeo } from '../controllers';

export const seoRouter = Router();

// get All SEO:
seoRouter.get('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get All SEO',
    });

});

// get SEO By Id: 
seoRouter.get('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get SEO By Id',
        id: { id }
    });

});

// delete SEO By Id
seoRouter.delete('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde delete SEO By Id',
        id: { id }
    });

});

// update SEO By Id
seoRouter.put('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde update SEO By Id',
        id: { id }
    });

});

// create SEO:
seoRouter.post('/:filter', [
        jwtValidator,
        permissionValidator(['admin_role', 'seo_role']),
        recordGenerator,
        check('id', 'Id is not valid').isMongoId(),
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('canonical', 'Canonical is required').notEmpty(),
        check('robots', 'Robots is required').notEmpty(),
        check('record', 'Record is required').notEmpty(),
        check('record.userName', 'UserName is required').notEmpty(),
        check('record.userId', 'UserId is required').notEmpty(),
        fieldValidator
    ],  createSeo,
);

export default seoRouter;