import { IRecord } from './';

export interface ISeo {
    title       : string,
    description : string,
    author      : string,
    keywords    : string[],
    //record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default ISeo;

