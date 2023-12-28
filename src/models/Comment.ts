import { Schema, model } from 'mongoose';

import { IComment } from '../interfaces';


const commentSchema = new Schema({
    content: {
        type      : String,
        lowercase : true,
        trim      : true,
    },
    active: {
        type      : Boolean,
        default   : true,
    },
    post: {
        type      : Schema.Types.ObjectId,
        ref       : 'Post',
        require   : true,
    },
    user: {
        type      : Schema.Types.ObjectId,
        ref       : 'User',
        require   : true,
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

commentSchema.methods.toJSON = function() {

    const  { __v, ...comment } = this.Object();
    return comment;
}


export const Comment = model<IComment>('Comment', commentSchema);

export default Comment;




