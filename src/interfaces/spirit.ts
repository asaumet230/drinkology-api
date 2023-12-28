import { IRecord } from './';

export interface ISpirit {
    name        : string,
    active?     : boolean,
    description : string,
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default ISpirit;