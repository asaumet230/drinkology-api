import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { sendError } from '../helpers';

export const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            message: 'No Token, invalid permission',
        });
    }

    try {
        
        const { id } = jwt.verify(token, process.env.SECRET_JWT_SEED || '') as { id: string };
        const authenticatedUser = await User.findById({ _id: id });

        if(!authenticatedUser || !authenticatedUser.active) {
            return res.status(401).json({
                ok: false,
                message: 'Not a valid Token',
            });
        }

        req.body.authenticatedUser = authenticatedUser;

        next();

    } catch (error) {
        sendError(res, error);
    }

}