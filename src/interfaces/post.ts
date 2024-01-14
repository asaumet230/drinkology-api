import { Types } from 'mongoose';

import { IRecord } from './';

export interface IPost {
    title            : string,
    review           : number,
    reviewValues?    : number[],
    active           : boolean,
    slug             : string,
    shortDescription : string,
    content          : string,
    images           : string[],
    tags             : string[],
    categories       : string[],
    video            : string,
    comments?        : Types.ObjectId[],
    user             : Types.ObjectId,
    seo?             : Types.ObjectId,
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}

export default IPost;