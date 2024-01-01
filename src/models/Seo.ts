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
    author: {
        type: String,
        lowercase : true,
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

    const { __v, ...seo } = this.toObject();
    return seo;
};


export const Seo = model<ISeo>('Seo', seoSchema);

export default Seo;
