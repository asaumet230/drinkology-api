import { model, Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { IPost } from '../interfaces';

export interface IPostDocument extends Document, IPost {};

const PostSchema =  new Schema({
    title: {
        type      : String,
        require   : [ true, 'Title is required' ],
        lowercase : true,
        unique    : true,
    },
    category: {
        type      : String,
        require   : [ true, 'Category is required' ],
        lowercase : true,
        unique    : true,
    },
    review: {
        type      : Number,
        min       : 0,
        max       : 5,
        default   : 0,
        require   : true,
    },
    reviewValues: [
        {
            type      : Number,
            min       : 0,
            max       : 5,
            default   : 0,
        },
    ],
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
    content: {
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
            require   : [ true, 'Description is required' ],
            lowercase : true, 
        } 
    ],
    video: { 
        type      : String,
        lowercase : true, 
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
    timestamps: true
});

PostSchema.index({ 
    title:    'text', 
    category: 'text', 
 });

PostSchema.methods.toJSON = function() {

    const { __v, ...post } = this.toObject();
    return post;
};

PostSchema.plugin(paginate);

export const Post = model<IPostDocument, PaginateModel<IPostDocument>>('Post', PostSchema);

export default Post;
