import { IRecord, ISeo } from './';


export interface ICocktail {
    title            : string,
    review           : number,
    active?          : boolean,
    slug             : string,
    history          : string,
    tools            : ITool[],
    ingredients      : string[],
    instructions     : string[],
    recommendations  : string,
    images           : string[],
    tags?            : string[],
    video?           : string,
    flavor           : string,
    spirits          : string[],
    occasions        : string[],
    seo              : ISeo,
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}


export interface ITool {
    name    : string,
    brand   : string,
    features: string,
}
export default ICocktail;