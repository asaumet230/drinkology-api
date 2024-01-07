import { Schema, model } from 'mongoose';

import { IComment } from '../interfaces';


const commentSchema = new Schema({
    content: {
        type      : String,
        require   : [ true, 'Content is required' ],
        lowercase : true,
        trim      : true,
    },
    active: {
        type      : Boolean,
        default   : false,
    },
    post: {
        type      : Schema.Types.ObjectId,
        ref       : 'Post',
    },
    appetizer: {
        type      : Schema.Types.ObjectId,
        ref       : 'Appetizer',
    },
    cocktail: {
        type      : Schema.Types.ObjectId,
        ref       : 'Cocktail',
    },
    user: {
        type      : Schema.Types.ObjectId,
        ref       : 'User',
        require   : [ true, 'User id is required' ],
    },
    userName: {
        type      : String,
        require   : [ true, 'UserName is required' ],
        lowercase : true,
    },
    userAvatar: {
        type      : String,
        require   : [ true, 'UserAvatar is required' ],
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

commentSchema.methods.toJSON = function() {

    const  { __v, ...comment } = this.toObject();
    return comment;
}


export const Comment = model<IComment>('Comment', commentSchema);

export default Comment;




