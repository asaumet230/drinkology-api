import { Types } from 'mongoose';

import { IRecord } from './';


export interface ICocktail {
    title            : string,
    review           : number,
    reviewValues?    : number[],
    active?          : boolean,
    slug             : string,
    history          : string,
    tools            : ITool[],
    ingredients      : string[],
    calories         : string,
    quantity         : string,
    glass            : string,
    instructions     : string[],
    recommendations  : IRecommendation[],
    images           : string[],
    tags?            : string[],
    video?           : string,
    flavor           : string,
    spirits          : string[],
    occasions        : string[],
    seo?             : Types.ObjectId,
    record           : IRecord[] | [],
    createdAt?       : Date,
    updatedAt?       : Date,
}

export interface ITool {
    name      : string,
    brand     : string,
    features  : string,
    attributes: string,
    link      : string,
}

export interface IRecommendation {
    name       : string,
    description: string,
    link       : string,
}

export default ICocktail;