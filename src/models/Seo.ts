import { model, Schema, Document, PaginateModel, Types  } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { ISeo } from '../interfaces';

export interface ISeoDocument extends Document, ISeo {};

const SeoSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        trim      : true,
        lowercase : true,
    },
    active: {
        type      : Boolean,
        default   : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        trim      : true,
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
        default   : true,
    }, 
    post: {
        type      : Types.ObjectId,
        ref       : 'Post',
    },
    appetizer: {
        type      : Types.ObjectId,
        ref       : 'Appetizer',
    },
    flavor: {
        type      : Types.ObjectId,
        ref       : 'Flavor',
    },
    occasion: {
        type      : Types.ObjectId,
        ref       : 'Occasion',
    },
    cocktail: {
        type      : Types.ObjectId,
        ref       : 'Cocktail',
    },
    Recipe: {
        type      : Types.ObjectId,
        ref       : 'Recipe',
    },
    user: {
        type      : Types.ObjectId,
        ref       : 'User',
        require   : [ true, 'User id is required' ],
    },
    socialMediaTags: {
        locale: {
            type      : String,
            trim      : true,
        },
        type: {
            type      : String,
            trim      : true,
            lowercase : true,
        },
        url: {
            type      : String,
            lowercase : true,
        },
        siteName: {
            type      : String,
            trim      : true,
            lowercase : true,
        },
        publisher: {
            type      : String,
            trim      : true,
        },
        image: {
            type      : String,
            lowercase : true,
        },
        author: {
            type      : String,
            trim      : true,
            lowercase : true,
        },
        creator: {
            type      : String,
            trim      : true,
        },
        site: {
            type      : String,
            trim      : true,
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

SeoSchema.index({ 
    title:      'text', 
    canonical:  'text',
 });

SeoSchema.methods.toJSON = function() {

    const { __v, ...seo } = this.toObject();
    return seo;
};

SeoSchema.plugin(paginate);

export const Seo = model<ISeoDocument, PaginateModel<ISeoDocument>>('Seo', SeoSchema);

export default Seo;
