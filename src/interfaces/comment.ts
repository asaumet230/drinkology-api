import { IRecord } from './';

export interface IComment {
    content     : string,
    active      : boolean,
    post?       : string,
    appetizer?  : string,  // TODO: Arreglar por Recipe
    cocktail?   : string,
    user        : string,
    userName    : string,
    userAvatar  : string, 
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IComment;


