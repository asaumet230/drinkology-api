import { Response } from 'express';

export const sendError = ( res: Response, error: any ) => {

    console.error(error);
    return res.status(500).json({
        ok: false,
        message: 'Error contact the administrator',
        error: `Error: ${ error }`
    });
}

export default sendError;