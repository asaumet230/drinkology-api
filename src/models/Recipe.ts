import { model, Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { IRecipe } from '../interfaces';


interface IRecipeDocument extends Document, IRecipe {};

const recipeSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
    },
    review: {
        type      : Number,
        default   : 0
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
    shortDescription: {
        type      : String,
        require   : [ true, 'ShortDescription is required' ],
        lowercase : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    images: [ 
        { 
            type      : String, 
            lowercase : true,  
        } 
    ],
    servings:  { 
        type          : String, 
        lowercase     : true,  
    },
    cookingTime:  { 
        type          : Number, 
    },
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
    url: { 
        type: String, 
        lowercase : true, 
    },
    ingredients: [
        {
            type      : String,
            lowercase : true,
        }
    ],
    appetizer: {
        type      :  String,
        enum      : ['dip', 'antipasto', 'tapas'],
        default   : 'dip'
    },
    occasions: [
        {
            type: String,
            enum: [
                'new years', 
                'fourth of july', 
                'valentines day', 
                'st patricks day', 
                'halloween', 
                'thanksgiving', 
                'christmas', 
                'spring', 
                'summer', 
                'fall',
                'winter',
                'brunch',
                'nightcap',
                'aperitif and digestif',
                'birthday parties',
                'parties',               
            ],
            default: 'summer'
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

recipeSchema.methods.toJSON = function() {

    const { __v, ...recipe } = this.Object();
    return recipe;
};

recipeSchema.plugin(paginate);

export const Recipe = model<IRecipeDocument, PaginateModel<IRecipeDocument>>('Recipe', recipeSchema);

export default Recipe;
