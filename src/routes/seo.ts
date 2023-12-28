import { Router, Request, Response } from 'express';

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
seoRouter.post('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde create SEO',
    });

});

export default seoRouter;