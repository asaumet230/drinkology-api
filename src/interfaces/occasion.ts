import { Types } from 'mongoose';

import { IRecord } from './';

export interface IOccasion {
    name        : string,
    active      : boolean,
    title       : string,
    description : string,
    image       : string,
    seo?        : Types.ObjectId,
    record      : IRecord[] | []
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IOccasion;