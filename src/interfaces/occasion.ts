import { IRecord } from '.';

export interface IOccasion {
    name        : string,
    active      : boolean,
    description : string,
    record      : IRecord[] | []
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IOccasion;