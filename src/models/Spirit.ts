import { Schema, model } from "mongoose";

import { ISpirit } from "../interfaces";


const spiritSchema = new Schema({
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

spiritSchema.methods.toJSON = function() {

    const  { __v, ...spirit } = this.toObject();
    return spirit;
}


export const Spirit = model<ISpirit>('Spirit', spiritSchema);

export default Spirit;




