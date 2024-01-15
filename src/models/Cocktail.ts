import { model, Schema, Document, PaginateModel, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { ICocktail } from '../interfaces';

export interface ICocktailDocument extends Document, ICocktail {};

const CocktailSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
        trim      : true,
        unique    : true,
    },
    review: {
        type      : Number,
        min       : 0,
        max       : 5,
        default   : 0,
        require   : true,
    },
    reviewValues: [
        {
            type      : Number,
            min       : 0,
            max       : 5,
            default   : 0,
        },
    ],
    active: {
        type      : Boolean,
        default   : true
    },
    slug: {
        type      : String,
        require   : [ true, 'Slug is required' ],
        lowercase : true,
        trim      : true,
        unique    : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    history: {
        type      : String,
        require   : [ true, 'History is required' ],
        lowercase : true,
    },
    tools: [
        {
            name: {
                type      : String,
                require   : [ true, 'Name is required' ],
                lowercase : true,
            },
            brand: {
                type      : String,
                require   : [ true, 'Brand is required' ],
                lowercase : true,
            },
            features: {
                type      : String,
                require   : [ true, 'Features is required' ],
                lowercase : true,
            },
            attributes: {
                type      : String,
                require   : [ true, 'Attributes is required' ],
                lowercase : true,
            },
            link: {
                type      : String,
                require   : [ true, 'Link is required' ],
                lowercase : true,
                default   : '/'
            },
        }
    ],
    ingredients: [
        { 
            type      : String,
            require   : [ true, 'Ingredients is required' ], 
            lowercase : true,  
        }
    ],
    calories: {
        type      : String,
        require   : [ true, 'Calories is required' ], 
        lowercase : true,  
    },
    quantity: {
        type      : String,
        require   : [ true, 'Quantity is required' ], 
        lowercase : true,  
    },
    glass: {
        type      : String,
        require   : [ true, 'Glass is required' ], 
        lowercase : true,  
    },
    instructions: [
        { 
            type      : String,
            require   : [ true, 'Instructions is required' ],
            lowercase : true,  
        }
    ],
    recommendations: [
        {
            name: {
                type      : String,
                require   : [ true, 'Name is required' ],
                lowercase : true,
            },   
            description: {
                type      : String,
                require   : [ true, 'Description is required' ],
                lowercase : true,
            },
            link: {
                type      : String,
                lowercase : true,
                default   : '/'
            },
        }
    ],
    images: [ 
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
    video: { 
        type      : String,
        lowercase : true, 
    },
    flavor: {
        type      : String,
        require   : [ true, 'Flavor is required' ],
        lowercase : true, 
    },
    spirits: [
        {
            type: String,
            require   : [ true, 'Spirits is required' ],
            lowercase : true, 
        },
    ],
    occasions: [
        {
            type: String,
            require   : [ true, 'Occasions is required' ],
            lowercase : true, 
        },
    ],
    seo: {
        type: Types.ObjectId,
        ref : 'Seo',
    },
    comments: [
        {
            type: Types.ObjectId,
            ref : 'Comment',        
        },
    ],
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

CocktailSchema.index({ 
    title:      'text', 
    spirit:     'text', 
    occasions:  'text', 
    flavor:     'text',
 });

CocktailSchema.methods.toJSON = function() {

    const { __v, ...cocktail } = this.toObject();
    return cocktail;
};

CocktailSchema.plugin(paginate);

export const Cocktail = model<ICocktailDocument, PaginateModel<ICocktailDocument>>('Cocktail', CocktailSchema);

export default Cocktail;
