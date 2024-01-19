import { NextFunction, Request, Response } from 'express';

import { IRecord } from '../interfaces';

export const recordGenerator = (req: Request, res: Response, next: NextFunction) => {

    const { authenticatedUser } = req.body;

    if(!authenticatedUser || !authenticatedUser.active) {
        return res.status(401).json({
            ok: false,
            message: 'Not a valid Token',
        });
    }

    const { _id, email } = authenticatedUser;

    const record: IRecord = {
        userId: _id!,
        userName: email,
    }

    req.body.record = record,
    
    next();
}