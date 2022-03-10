import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface reply {
    _id: number
    epoch: number
    writer_id: string
    writer_pseudo: string
    comment: string
}

export const replySchema = new Schema<reply>({
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
})

const Reply = mongoose.model('Reply', replySchema);

export default Reply