import { IRecord } from '.';

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