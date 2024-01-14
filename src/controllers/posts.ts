import { Request, Response } from 'express';

import { sendError } from '../helpers'


export const createPost = (req: Request, res: Response) => {

    try {

        
        
    } catch (error) {
        sendError(res, error);
    }
}