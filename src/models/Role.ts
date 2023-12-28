import { Schema, model } from "mongoose";

import { IRole } from "../interfaces";


const roleSchema = new Schema({
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

roleSchema.methods.toJSON = function() {

    const  { __v, ...role } = this.toObject();
    return role;
}


export const Role = model<IRole>('Role', roleSchema);

export default Role;




