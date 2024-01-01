import { Schema, model } from "mongoose";

import { IOccasion } from "../interfaces";


const occasionSchema = new Schema({
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
        require   : [ true, 'Title is required' ],
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

occasionSchema.methods.toJSON = function() {

    const  { __v, ...occasion } = this.toObject();
    return occasion;
}


export const Occasion = model<IOccasion>('Occasion', occasionSchema);

export default Occasion;




