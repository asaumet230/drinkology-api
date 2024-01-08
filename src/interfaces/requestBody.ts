import { IRecord, ISeo } from '.';

import { IRecommendation, ITool } from './cocktail';

export interface IUserBody {
    name     : string,
    lastName : string,
    email    : string,
    password : string,
    image?   : string,
    role     : string,
    record   : IRecord,
}

export interface IRequestBody { 
    name        : string,  
    description : string,
    record      : IRecord,
};

export interface IRequestCocktails {
    title            : string,
    review           : number,
    slug             : string,
    history          : string,
    tools            : ITool[],
    ingredients      : string[],
    instructions     : string[],
    recommendations  : IRecommendation[],
    images           : string[],
    tags             : string[],
    video            : string,
    flavor           : string,
    spirits          : string[],
    occasions        : string[],
    seo              : ISeo,
    record           : IRecord,
};

export interface IRequestComment {
    content             : string,
    post?               : string,
    appetizer?          : string,
    cocktail?           : string,
    userAuthenticatedId : string,
    record              : IRecord,
}

export interface IRequestRecipe {
    title              : string,
    review             : number,
    slug               : string,
    description        : string,
    history            : string,
    tools              : ITool[],
    ingredients        : string[],
    calories           : string,
    quantity           : string,
    servings           : string,
    ServingSuggestions : string[],
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
    seo                : ISeo,
    record             : IRecord,
}