import { IRecord } from './';

export interface IComment {
    content     : string,
    active      : boolean,
    post        : string,
    user        : string, 
    record      : IRecord[] | [],
    createdAt?  : Date,
    updatedAt?  : Date,
}

export default IComment;


