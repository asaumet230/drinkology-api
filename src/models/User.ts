import { Schema, model } from "mongoose";

import { IUser } from "../interfaces";


const userSchema = new Schema({
    name: {
        type      : String,
        require   : [ true, 'Name is required' ],
        lowercase : true,
        trim      : true,
    },
    lastName: {
        type      : String,
        require   : [ true, 'Last Name is required' ],
        lowercase : true,
        trim      : true,
    },
    userName: {
        type      : String,
        require   : [ true, 'User Name is required' ],
        lowercase : true,
        trim      : true,
    },
    active: {
        type      : Boolean,
        default   : true,
    },
    email: {
        type      : String,
        require   : [ true, 'Email is required' ],
        lowercase : true,
        unique    : true,
    },
    password: {
        type      : String,
        require   : [ true, 'Password is required' ],
        trim      : true,
    },
    image: {
        type   : String,
        default: 'https://res.cloudinary.com/du6kucdgb/image/upload/v1676759146/samples/nomad/no-photo_b4nvhq.jpg'    
    },
    google: {
        type      : Boolean,
        default   : false,
    },
    socialMediaNetworks: {
        twitter: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.twitter.com/',
            }
        },
        facebook: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.facebook.com/',
            }
        },
        pinterest: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.pinterest.com/',
            }
        },
        instagram: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.instagram.com/',
            }
        },
        tiktok: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.tiktok.com/',
            }
        },
        youtube: {
            userName : {
                type      : String,
                lowercase : true,
                default   : 'no user name',
            },
            link      : {
                type      : String,
                lowercase : true,
                default   : 'https://www.youtube.com/',
            }
        },
    },
    role: {
        type: String,
        require: true,
        enum: [
            'admin_role', 
            'user_role', 
            'sales_role', 
            'seo_role',
        ],
        default: 'user_role'
    },
    verificationCode: {
        type: String,
    },
    changePasswordCode: {
        type: String,
    },
    record: [ 
        {
            userName: {
                type      : String,
                lowercase : true, 
            },
            userId: {
                type: String,
            },
            updatedAt: {
                type    : Date,
                default : Date.now()
            }   
        } 
    ],
}, {
    timestamps: true,
});

userSchema.methods.toJSON = function() {

    const  { __v, password, ...user } = this.toObject();
    return user;
}


export const User = model<IUser>('User', userSchema);

export default User;




