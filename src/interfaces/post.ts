import { Types } from 'mongoose';

import { IRecord } from './';

export interface IPost {
    title            : string,
    category         : string,
    review           : number,
    reviewValues?    : number[],
    active           : boolean,
    slug             : string,
    shortDescription : string,
    content          : string,
    images           : string[],
    tags             : string[],
    video?           : string,
    user?            : Types.ObjectId,
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}

export default IPost;