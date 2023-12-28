import { Router, Request, Response } from 'express';

export const postsRouter = Router();

// get All Posts:
postsRouter.get('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get All Posts',
    });

});

// get Post By Id: 
postsRouter.get('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get Post By Id',
        id: { id }
    });

});

// delete Post By Id
postsRouter.delete('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde delete Post By Id',
        id: { id }
    });

});

// update Post By Id
postsRouter.put('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde update Post By Id',
        id: { id }
    });

});

// create Post
postsRouter.post('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde create Post',
    });

});

// Search Post By Post title:
postsRouter.get('/search/:title', (req: Request, res: Response ) => {

    const { title } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde search Post by title',
        title: { title }
    });

});

export default postsRouter;