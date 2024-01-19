import { IRecord } from './';

export interface IUser {
    name                 : string,
    _id?                 : string,
    lastName             : string,
    userName             : string,
    active?              : boolean,
    email                : string,
    password             : string,
    image?               : string,
    google?              : boolean,
    socialMediaNetworks? : ISocialMediaNetworks,
    role                 : string,
    verificationCode?    : string,
    changePasswordCode?  : string,
    record               : IRecord[] | [],
    createdAt?           : Date,
    updatedAt?           : Date,
}

export interface ISocialMediaNetworks {
    twitter    : INetwork,
    facebook   : INetwork,
    pinterest  : INetwork,
    instagram  : INetwork,
    tiktok     : INetwork,
    youtube    : INetwork,
}

export interface INetwork {
    userName    : string,
    link        : string,
}

export default IUser;