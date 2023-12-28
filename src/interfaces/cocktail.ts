import { IRecord } from './';


export interface ICocktail {
    title            : string,
    review           : number,
    active           : boolean,
    slug             : string,
    shortDescription : string,
    description      : string,
    images           : string[],
    ingredients      : string[],
    tags             : string[],
    video            : string,
    url              : string,
    flavor           : string,
    spirits          : string[],
    occasions        : string[],
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}

export default ICocktail;