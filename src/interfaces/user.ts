import { IRecord } from './';

export interface IUser {
    _id?                : string,
    name                : string,
    lastName            : string,
    active?             : boolean,
    email               : string,
    password            : string,
    image?              : string,
    google?             : boolean,
    role                : string,
    verificationCode?   : string,
    changePasswordCode? : string,
    record              : IRecord[] | [],
    createdAt?          : Date,
    updatedAt?          : Date,
}

export default IUser;