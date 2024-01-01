import { model, Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { ICocktail } from '../interfaces';


interface ICocktailDocument extends Document, ICocktail {};

const cocktailSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
    },
    review: {
        type      : Number,
        min       : 0,
        max       : 5,
        default   : 0,
        require   : true,
    },
    active: {
        type      : Boolean,
        default   : true
    },
    slug: {
        type      : String,
        require   : [ true, 'Slug is required' ],
        unique    : true,
        lowercase : true,
        trim      : true
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
        }
    ],
    ingredients: [
        { 
            type      : String,
            require   : [ true, 'Ingredients is required' ], 
            lowercase : true,  
        }
    ],
    instructions: [
        { 
            type      : String,
            require   : [ true, 'Instructions is required' ],
            lowercase : true,  
        }
    ],
    recommendations: {
        type      : String,
        require   : [ true, 'Recommendations is required' ],
        lowercase : true,
    },
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
            type      : String,
            require   : [ true, 'Author is required' ],
            lowercase : true,
        },
        keywords: [
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

cocktailSchema.methods.toJSON = function() {

    const { __v, ...cocktail } = this.toObject();
    return cocktail;
};

cocktailSchema.plugin(paginate);

export const Cocktail = model<ICocktailDocument, PaginateModel<ICocktailDocument>>('Cocktail', cocktailSchema);

export default Cocktail;
