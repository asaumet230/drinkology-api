import { model, Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { IRecipe } from '../interfaces';


interface IRecipeDocument extends Document, IRecipe {};

const RecipeSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
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
        default   : true,
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
    servings:  { 
        type      : String, 
        require   : [ true, 'Servings is required' ], 
        lowercase : true,  
    },
    ServingSuggestions : [
        { 
            type      : String, 
            require   : [ true, 'Serving Suggestion is required' ],
            lowercase : true,  
        } 
    ],
    preparationTime: {
        type      : String, 
        require   : [ true, 'Preparation Time is required' ],
        lowercase : true,
    },
    cookingTime: {
        type      : String, 
        require   : [ true, 'Cooking Time is required' ],
        lowercase : true,
    },
    instructions: [
        { 
            type      : String,
            require   : [ true, 'Instructions is required' ],
            lowercase : true,  
        }
    ],
    tips: [
        { 
            type      : String,
            require   : [ true, 'Tips is required' ],
            lowercase : true,  
        }
    ],
    images: [ 
        { 
            type      : String, 
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
    appetizer: {
        type      : String,
        require   : [ true, 'Appetizer is required' ],
        default   : 'dip'
    },
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

RecipeSchema.index({ 
    title:      'text', 
    appetizer:  'text', 
    occasions:  'text', 
 });

RecipeSchema.methods.toJSON = function() {

    const { __v, ...recipe } = this.toObject();
    return recipe;
};

RecipeSchema.plugin(paginate);

export const Recipe = model<IRecipeDocument, PaginateModel<IRecipeDocument>>('Recipe', RecipeSchema);

export default Recipe;
