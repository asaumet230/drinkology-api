import { Types } from 'mongoose';

import { IRecord } from './';

export interface IComment {
    content     : string,
    active      : boolean,
    post?       : Types.ObjectId,
    recipe?     : Types.ObjectId,
    cocktail?   : Types.ObjectId,
    userId      : Types.ObjectId,
    userName    : string,
    userAvatar  : string, 
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IComment;


