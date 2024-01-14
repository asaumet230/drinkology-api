import { Schema, Types, model } from 'mongoose';

import { ISpirit } from '../interfaces';


const spiritSchema = new Schema({
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
    seo: {
        type      : Types.ObjectId,
        ref       : 'Seo',
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

spiritSchema.methods.toJSON = function() {

    const  { __v, ...spirit } = this.toObject();
    return spirit;
}

export const Spirit = model<ISpirit>('Spirit', spiritSchema);

export default Spirit;




