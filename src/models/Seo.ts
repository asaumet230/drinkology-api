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
    canonical: {
        type      : String,
        require   : [ true, 'Canonical is required' ],
        lowercase : true,
        unique    : true,
    },
    robots: {
        type      : Boolean,
        require   : [ true, 'Robots is required' ],
        default   : false,
    }, 
    post: {
        type      : Schema.Types.ObjectId,
        ref       : 'Post',
    },
    appetizer: {
        type      : Schema.Types.ObjectId,
        ref       : 'Appetizer',
    },
    flavor: {
        type      : Schema.Types.ObjectId,
        ref       : 'Flavor',
    },
    occasion: {
        type      : Schema.Types.ObjectId,
        ref       : 'Occasion',
    },
    cocktail: {
        type      : Schema.Types.ObjectId,
        ref       : 'Cocktail',
    },
    Recipe: {
        type      : Schema.Types.ObjectId,
        ref       : 'Recipe',
    },
    user: {
        type      : Schema.Types.ObjectId,
        ref       : 'User',
        require   : [ true, 'User id is required' ],
    },
    socialMediaTags: {
        locale: {
            type      : String,
            lowercase : true,
        },
        type: {
            type      : String,
            lowercase : true,
        },
        url: {
            type      : String,
            lowercase : true,
        },
        siteName: {
            type      : String,
            lowercase : true,
        },
        publisher: {
            type      : String,
            lowercase : true,
        },
        image: {
            type      : String,
            lowercase : true,
        },
        author: {
            type      : String,
            lowercase : true,
        },
        creator: {
            type      : String,
            lowercase : true,
        },
        site: {
            type      : String,
            lowercase : true,
        },
        keywords: [
            {
                type      : String,
                lowercase : true,
            }
        ], 
        tags: [
            {
                type      : String,
                lowercase : true,
            }
        ], 
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
