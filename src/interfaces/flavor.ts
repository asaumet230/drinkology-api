import { IRecord } from './';

export interface IFlavor {
    name        : string,
    active?     : boolean,
    title       : string,
    description : string,
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IFlavor;