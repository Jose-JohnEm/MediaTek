import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface user {
    _id: string
    email: string
    pseudo: string
    password: string
    certificat?: {
        valid?: boolean
        code?: number
    }
    liked_ids?: string[]
    saved_ids?: string[]
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
    certificat: {
        valid: {
            type: Boolean,
            default: false
        },
        code: Number,
    },
    liked_ids: [ String ],
    saved_ids: [ String ],
})

const User = mongoose.model('User', userSchema);

export default User