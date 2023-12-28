import { Router, Request, Response } from 'express';


export const cocktailsRouter = Router();

// create Cocktail:
cocktailsRouter.post('/', (_, res: Response) => {
    
    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Create Cocktail',
    });

});

// update Cocktail By Id:
cocktailsRouter.put('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Update Cocktail by id',
        id: { id }
    });

});

// delete Cocktail By Id
cocktailsRouter.delete('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Delete Cocktail by id',
        id: { id }
    });

});

// get Cocktail By Id
cocktailsRouter.get('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Get Cocktail by id',
        id: { id }
    });

});

//get All Cocktails:
cocktailsRouter.get('/', (_, res: Response) => {
    
    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Get All Cocktails',
    });

});

// get Cocktails By "Title, Spirit, Occasion, Flavor":
cocktailsRouter.get('/search/:searchType', (req: Request, res: Response) => {

    const { searchType } = req.params as { searchType: string };
    const { title = '', spirit = '', occasion = '', flavor = '' } = req.query;

    switch (searchType) {

        case 'title':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde title',
                title: { title },
                searchType: { searchType }, 
            });

        case 'spirit':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde spirit',
                spirit: { spirit },
                searchType: { searchType }, 
            });

        case 'occasion':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde occasion',
                occasion: { occasion },
                searchType: { searchType }, 
            });

        case 'flavor':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde flavor',
                flavor: { flavor },
                searchType: { searchType }, 
            });
            
    
        default:
            return res.status(200).json({
                ok: false,
                message: 'Sorry End Point not found',
            });
    }

}); 

// get Cocktails By Title And Spirit:
cocktailsRouter.get('/search/title&spirit/:term', (req: Request, res: Response) => {

    const { term='' } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde search by title and spirit',
        term: { term },
    });


});


export default cocktailsRouter;