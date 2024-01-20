import { IRecord } from '.';

import { IRecommendation, ITool } from './cocktail';
import { SocialMediaTags } from './seo';
import IUser, { ISocialMediaNetworks } from './user';


export interface IUserBody {
    name                 : string,
    lastName             : string,
    email                : string,
    password             : string,
    image?               : string,
    socialMediaNetworks? : ISocialMediaNetworks,
    role                 : string,
    record               : IRecord,
}

export interface IRequestBody { 
    name        : string,
    title       : string,
    slug        : string,  
    description : string,
    image       : string,
    record      : IRecord,
};

export interface IRequestCocktails {
    title            : string,
    review           : number,
    slug             : string,
    description      : string,
    history          : string,
    tools            : ITool[],
    ingredients      : string[],
    calories         : string,
    quantity         : string,
    glass            : string,
    instructions     : string[],
    recommendations  : IRecommendation[],
    images           : string[],
    tags             : string[],
    video            : string,
    flavor           : string,
    spirits          : string[],
    occasions        : string[],
    record           : IRecord,
};

export interface IRequestComment {
    content             : string,
    post?               : string,
    recipe?             : string,
    cocktail?           : string,
    authenticatedUser?  : IUser,
    record              : IRecord,
}

export interface IRequestRecipe {
    title               : string,
    review              : number,
    slug                : string,
    description         : string,
    history             : string,
    tools               : ITool[],
    ingredients         : string[],
    calories            : string,
    quantity            : string,
    servings            : string,
    ServingSuggestions  : string[],
    preparationTime     : string,
    cookingTime         : string,
    instructions        : string[],
    tips                : string[], 
    images              : string[],
    recommendations     : IRecommendation[],
    tags?               : string[],
    video?              : string,
    appetizer           : string,
    occasions           : string[],
    record              : IRecord,
}

export interface IRequestSeo {
    title              : string,         
    description        : string,           
    canonical          : string,            
    robots             : boolean,          
    socialMediaTags?   : SocialMediaTags,
    authenticatedUser? : IUser,
    record             : IRecord, 
}