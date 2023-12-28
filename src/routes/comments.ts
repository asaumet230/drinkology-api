import { Router, Request, Response } from 'express';

export const commentsRouter = Router();

// get All Comments:
commentsRouter.get('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get All Comments',
    });

});

// get Comment By Id: 
commentsRouter.get('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get Comment By Id',
        id: { id }
    });

});

// delete Comment By Id
commentsRouter.delete('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde delete Comment By Id',
        id: { id }
    });

});

// update Comment By Id
commentsRouter.put('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde update Comment By Id',
        id: { id }
    });

});

// create Comment:
commentsRouter.post('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde create Comment',
    });

});

// Search Comments By Post Id:
commentsRouter.get('/search/:postId', (req: Request, res: Response ) => {

    const { postId } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde search Comments by Id',
        postId: { postId }
    });

});

export default commentsRouter;