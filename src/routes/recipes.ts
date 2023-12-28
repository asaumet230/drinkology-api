import { Router, Request, Response } from 'express';


export const recipesRouter = Router();

// create Recipe:
recipesRouter.post('/', (_, res: Response) => {
    
    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Create Recipe',
    });

});

// update Recipe By Id:
recipesRouter.put('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Update Recipe by id',
        id: { id }
    });

});

// delete Recipe By Id
recipesRouter.delete('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Delete Recipe by id',
        id: { id }
    });

});

// get Recipe By Id
recipesRouter.get('/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Get Recipe by id',
        id: { id }
    });

});

//get All Recipes:
recipesRouter.get('/', (_, res: Response) => {
    
    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde Get All Recipes',
    });

});

// get Recipes By "Title, Category, Occasion":
recipesRouter.get('/search/:searchType', (req: Request, res: Response) => {

    const { searchType } = req.params as { searchType: string };
    const { title = '', category = '', occasion = '' } = req.query;

    switch (searchType) {

        case 'title':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde title',
                title: { title },
                searchType: { searchType }, 
            });

        case 'category':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde category',
                category: { category },
                searchType: { searchType }, 
            });

        case 'occasion':
            return res.status(200).json({
                ok: true,
                message: 'Todo ok desde occasion',
                occasion: { occasion },
                searchType: { searchType }, 
            });            
    
        default:
            return res.status(200).json({
                ok: false,
                message: 'Sorry End Point not found',
            });
    }

}); 

// get Recipes By Title And Category:
recipesRouter.get('/search/title&category/:term', (req: Request, res: Response) => {

    const { term='' } = req.params;

    return res.status(200).json({
        ok: true,
        message: 'Todo ok desde search by title and category',
        term: { term },
    });


});


export default recipesRouter;