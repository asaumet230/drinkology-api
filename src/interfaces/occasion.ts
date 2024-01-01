import { IRecord } from '.';

export interface IOccasion {
    name        : string,
    title       : string,
    description : string,
    active?     : boolean,
    record      : IRecord[] | []
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IOccasion;