import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface user {
    _id: string
    email: string
    pseudo: string
    password: string
    token?: string
    certificat?: {
        valid?: boolean
        code?: number
    }
    liked_ids?: number[]
    saved_ids?: number[]
}

const emailValidation = (email: string) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const userSchema = new Schema<user>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [emailValidation, 'invalidEmail']
    },
    pseudo: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: String,
    certificat: {
        valid: Boolean,
        code: Number,
    },
    liked_ids: [ Number ],
    saved_ids: [ Number ],
})

const User = mongoose.model('User', userSchema);

export default User