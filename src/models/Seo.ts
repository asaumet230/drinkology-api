import { model, Schema } from 'mongoose';

import { ISeo } from '../interfaces';

const seoSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    authors: [ 
        { 
            user: {
                type: String,
                lowercase : true,
            },
            url: {
                type: String,
                lowercase : true,
            }
        } 
    ],
    creathor: { 
        type      : String, 
        lowercase : true, 
    },
    email: { 
        type      : String,
        lowercase : true, 
    },
    address: { 
        type: String, 
        lowercase : true, 
    },
    telephone: { 
        type: String, 
        lowercase : true, 
    },
    languages: { 
        type: String, 
        lowercase : true, 
    },
    image: { 
        type: String, 
        lowercase : true, 
    },
    post: {
        type      : Schema.Types.ObjectId,
        ref       : 'Post',
        require   : true,
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
    timestamps: true
});

seoSchema.methods.toJSON = function() {

    const { __v, ...seo } = this.Object();
    return seo;
};


export const Seo = model<ISeo>('Seo', seoSchema);

export default Seo;
