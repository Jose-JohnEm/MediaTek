import mongoose from "mongoose";
import { replySchema, reply } from './reply';

const Schema = mongoose.Schema;

export interface comment {
    _id: string
    epoch: number
    writer_id: string
    writer_pseudo: string
    comment: string
    replyes: reply[]
}

export const commentSchema = new Schema<comment>({
    epoch: {
        type: Number,
        required: true,
        default: Date.now()
    },
    writer_id: {
        type: String,
        required: true,
    },
    writer_pseudo: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replyes: [ replySchema ]
})

const comment = mongoose.model('Comment', commentSchema);

export default Comment