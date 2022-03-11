import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'
import CommentModel from '../models/comments'
import ReplyModel from '../models/reply'
import { emailCodeSend } from '../sign/sign'

export const checkValidation = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    const user = await UserModel.findById(req.body.user_id)

    console.log(req.body.code, user!.certificat!.code)

    if (req.body.code == user!.certificat!.code) {
        user!.certificat!.valid = true
        user!.save()
        res.status(200).json({message: 'Authentication successful !'})
    }
    else {
        res.status(501).json({message: 'Authentication failed !'})
    }
}

export const sendAnotherCode = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    const user = await UserModel.findById(req.body.user_id)

    user!.certificat!.code = Math.floor(Math.random() * (10000 - 1000) + 1000)
    emailCodeSend(user!.email, user!.certificat!.code)
    user!.save()
    res.json({message: 'Code sended !'})
}
