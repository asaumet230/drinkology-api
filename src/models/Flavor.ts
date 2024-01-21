import { Schema, model } from 'mongoose';

import { IFlavor } from '../interfaces';


const flavorSchema = new Schema({
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

flavorSchema.methods.toJSON = function() {

    const  { __v, ...flavor } = this.toObject();
    return flavor;
}

export const Flavor = model<IFlavor>('Flavor', flavorSchema);

export default Flavor;




