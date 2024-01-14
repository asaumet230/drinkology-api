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
    socialMediaNetworks? : SocialMediaNetworks,
    role                 : string,
    verificationCode?    : string,
    changePasswordCode?  : string,
    record               : IRecord[] | [],
    createdAt?           : Date,
    updatedAt?           : Date,
}

export interface SocialMediaNetworks {
    twitter    : Network,
    facebook   : Network,
    pinterest  : Network,
    instagram  : Network,
    tiktok     : Network,
    youtube    : Network,
}

export interface Network {
    userName    : string,
    link        : string,
}

export default IUser;