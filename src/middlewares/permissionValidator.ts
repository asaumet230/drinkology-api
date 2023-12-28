import { NextFunction, Request, Response } from 'express';


export const permissionValidator = ( roles: string[] ) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const { authenticatedUser } = req.body;
    
        const { role, name } = authenticatedUser;

        if( !roles.includes(role) ) {
            return res.status(401).json({
                ok: false,
                message: `The user: ${name} does not have the permissions`,
            });
        }

        next();
    }

}

export const haveSameId = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params as { id: string };
    const { userAuthenticatedId } = req.body;

    if( userAuthenticatedId !== id ) {
        return res.status(401).json({
            ok: false,
            message: 'Not have the same Id'
        });
    }

    next();
}

