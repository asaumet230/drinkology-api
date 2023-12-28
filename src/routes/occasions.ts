import { Router, Request, Response } from 'express';


export const ocassionsRouter = Router();


// get All Ocassions:
ocassionsRouter.get('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get All Ocassions',
    });

});

// get Ocassion By Id: 
ocassionsRouter.get('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde get Occasion By Id',
        id: { id }
    });

});

// delete Ocassion By Id:
ocassionsRouter.delete('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde delete Occasion By Id',
        id: { id }
    });

});

// update Ocassion By Id
ocassionsRouter.put('/:id', (req: Request, res: Response ) => {

    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde update Occasion By Id',
        id: { id }
    });

});

// create Ocassion:
ocassionsRouter.post('/', (_, res: Response ) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde create Occasion',
    });

});

export default ocassionsRouter;