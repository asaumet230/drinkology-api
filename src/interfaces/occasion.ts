import { Types } from 'mongoose';

import { IRecord } from './';

export interface IOccasion {
    name        : string,
    active      : boolean,
    title       : string,
    slug        : string,
    description : string,
    image       : string,
    record      : IRecord[] | []
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IOccasion;