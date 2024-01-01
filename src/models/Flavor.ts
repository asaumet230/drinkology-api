import { Schema, model } from "mongoose";

import { IFlavor } from "../interfaces";


const flavorSchema = new Schema({
    name: {
        type      : String,
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
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
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




