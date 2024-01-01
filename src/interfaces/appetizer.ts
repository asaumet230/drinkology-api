import { IRecord } from './';

export interface IAppetizer {
    name        : string,
    active      : boolean,
    title       : string,
    description : string,
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IAppetizer;