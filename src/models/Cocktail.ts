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
    ingredients: [ 
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
    url: { 
        type: String, 
        lowercase : true, 
    },
    flavor: {
        type      : String,
        enum      : [
            'bitter', 
            'sweet', 
            'salty', 
            'sour', 
            'umami',
        ],
        default   : 'bitter',
    },
    spirits: [
        {
            type: String,
            enum: [
                'wine', 
                'cognac',
                'whiskey', 
                'vodka', 
                'tequila', 
                'gin', 
                'brandy', 
                'champagne', 
                'others',
            ],
            default: 'others'
        },
    ],
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

cocktailSchema.methods.toJSON = function() {

    const { __v, ...cocktail } = this.Object();
    return cocktail;
};

cocktailSchema.plugin(paginate);

export const Cocktail = model<ICocktailDocument, PaginateModel<ICocktailDocument>>('Cocktail', cocktailSchema);

export default Cocktail;
