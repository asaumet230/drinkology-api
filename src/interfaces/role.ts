import { IRecord } from './';

export interface IRole {
    name        : string,
    active      : boolean,
    description : string,
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IRole;


