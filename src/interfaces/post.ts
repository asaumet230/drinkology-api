import { Schema } from 'mongoose';
import { IRecord } from './';

export interface IPost {
    title            : string,
    review           : number,
    active           : boolean,
    slug             : string,
    shortDescription : string,
    description      : string,
    images           : string[],
    tags             : string[],
    video            : string,
    url              : string,
    comments         : Schema.Types.ObjectId[],
    user             : Schema.Types.ObjectId,
    seo              : Schema.Types.ObjectId,
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}

export default IPost;