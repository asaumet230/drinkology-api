import { Response, Router } from 'express';
import path from 'path';

export const homeRouter = Router();

homeRouter.get('/', (_, res: Response) => {

    return res.sendFile(path.resolve(__dirname, '../public/index.html'));

});

export default homeRouter;