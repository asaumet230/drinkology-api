import jwt from 'jsonwebtoken';


export const generarJWT = (id = '') => {

    return new Promise( (resolve, reject) => {

        const payload = {
            id
        }

        jwt.sign(payload, process.env.SECRET_JWT_SEED || '', {expiresIn: '2h'},
        (error, token) => {
            if(error) {
                reject(`Can't generate JWT: ${error}`);
            } else {
                resolve(token);
            }
        });

    }); 
}

export default generarJWT;