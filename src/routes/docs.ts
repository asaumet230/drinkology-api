import { Response, Router } from 'express';
import path from 'path';

export const docsRouter = Router();

docsRouter.get('/', (_, res: Response) => {

    return res.sendFile(path.resolve(__dirname, '../public/docs.html'));

});

export default docsRouter;