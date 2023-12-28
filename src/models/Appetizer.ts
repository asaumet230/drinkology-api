import { Schema, model } from "mongoose";

import { IAppetizer } from "../interfaces";


const appetizerSchema = new Schema({
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

appetizerSchema.methods.toJSON = function() {

    const  { __v, ...appetizer } = this.toObject();
    return appetizer;
}

export const Appetizer = model<IAppetizer>('Appetizer', appetizerSchema);

export default Appetizer;




