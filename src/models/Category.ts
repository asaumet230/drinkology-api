import { Schema, model } from 'mongoose';

import { ICategory } from '../interfaces';


const CategorySchema = new Schema({
    name: {
        type      : String,
        require   : [ true, 'Name is required' ],
        lowercase : true,
        trim      : true,
        unique    : true,
    },
    active: {
        type      : Boolean,
        default   : true,
    },
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
    },
    slug: {
        type      : String,
        require   : [ true, 'Slug is required' ],
        lowercase : true,
        trim      : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    image: {
        type      : String,
        require   : [ true, 'Image is required' ],
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
    timestamps: true,
});

CategorySchema.methods.toJSON = function() {

    const  { __v, ...category } = this.toObject();
    return category;
}

export const Category = model<ICategory>('Category', CategorySchema);

export default Category;




