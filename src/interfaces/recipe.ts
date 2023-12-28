import { IRecord } from './';


export interface IRecipe {
    title            : string,
    review           : number,
    active           : boolean,
    slug             : string,
    shortDescription : string,
    description      : string,
    images           : string[],
    servings         : string,
    cookingTime      : number,
    ingredients      : string[],
    tags             : string[],
    video            : string,
    url              : string,
    appetizer        : string,
    ocassions        : string[],
    record           : IRecord[] | []
    createdAt?       : Date,
    updatedAt?       : Date,
}

export default IRecipe;