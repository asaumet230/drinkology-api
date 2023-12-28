import { model, Schema } from 'mongoose';

import { IPost } from '../interfaces';

const postSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
    },
    review: {
        type      : Number,
        default   : 0
    },
    active: {
        type      : Boolean,
        default   : true
    },
    slug: {
        type      : String,
        require   : [ true, 'Slug is required' ],
        unique    : true,
        lowercase : true,
        trim      : true
    },
    shortDescription: {
        type      : String,
        require   : [ true, 'ShortDescription is required' ],
        lowercase : true,
    },
    description: {
        type      : String,
        require   : [ true, 'Description is required' ],
        lowercase : true,
    },
    images: [ 
        { 
            type      : String, 
            lowercase : true,  
        } 
    ],
    tags: [ 
        { 
            type      : String, 
            lowercase : true, 
        } 
    ],
    video: { 
        type      : String,
        lowercase : true, 
    },
    url: { 
        type: String, 
        lowercase : true, 
    },
    user: {
        type      : Schema.Types.ObjectId,
        ref       : 'User',
        require   : true,
    },
    seo: {
        type      : Schema.Types.ObjectId,
        ref       : 'Seo',
        require   : true,
    },
    comments: [
        {
            type      : Schema.Types.ObjectId,
            ref       : 'Comment',
            require   : true,
        }
    ],
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
    timestamps: true
});

postSchema.methods.toJSON = function() {

    const { __v, ...post } = this.Object();
    return post;
};


export const Post = model<IPost>('Post', postSchema);

export default Post;
