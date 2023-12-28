import { Schema } from 'mongoose';
import { IRecord } from './';

export interface ISeo {
    title       : string,
    description : string,
    authors     : IAuthors[] | [],
    creathor?   : string,
    email?      : string,
    address?    : string,
    telephone?  : string,
    languages?  : string,
    image?      : string,
    post        : Schema.Types.ObjectId,
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default ISeo;

interface IAuthors {
    user : string,
    url  : string,
}


