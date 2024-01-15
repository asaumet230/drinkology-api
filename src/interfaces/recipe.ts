import { Types } from 'mongoose';

import { IRecord } from './';
import { IRecommendation, ITool } from './cocktail';


export interface IRecipe {
    title              : string,
    review             : number,
    reviewValues?      : number[],
    active             : boolean,
    slug               : string,
    description        : string,
    history            : string,
    tools              : ITool[],
    ingredients        : string[],
    calories           : string,
    quantity           : string,
    servings           : string,
    servingSuggestions : string[],
    preparationTime    : string,
    cookingTime        : string,
    instructions       : string[],
    tips               : string[], 
    images             : string[],
    recommendations    : IRecommendation[],
    tags?              : string[],
    video?             : string,
    appetizer          : string,
    occasions          : string[],
    seo?               : Types.ObjectId,
    comments?          : Types.ObjectId[],
    record             : IRecord[] | []
    createdAt?         : Date,
    updatedAt?         : Date,
}

export default IRecipe;