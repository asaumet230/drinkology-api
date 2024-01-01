import { Router } from 'express';
import { seedData } from '../controllers';


export const seedRouter = Router();

seedRouter.get('/', seedData);

export default seedRouter;

