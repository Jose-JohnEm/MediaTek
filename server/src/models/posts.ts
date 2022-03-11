import mongoose from "mongoose";
import { comment, commentSchema } from './comments'


const Schema = mongoose.Schema;

interface post {
    _id: number
    epoch: number
    title: string
    category: string
    description: string
    src: string
    artist: {
        name: string
        id: string
    }
    likes: number
    views: number
    comments: comment[]
}

export const postSchema = new Schema<post>({
    epoch: {
        type: Number,
        required: true,
        default: Date.now()
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    artist: {
        name: {
            type: String,
            require: true,
        },
        id: {
            type: String,
            require: true,
        },
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    },
    comments: {
        type: [ commentSchema ],
        required: false,
        ref: 'Comment'
    }
})

const Post = mongoose.model('Post', postSchema)

postSchema.pre('save', function(next) {
    next();
});

export default Post