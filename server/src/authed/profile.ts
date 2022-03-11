import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'
import CommentModel from '../models/comments'
import ReplyModel from '../models/reply'

export const getProfile = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {

    res.json(await UserModel.findById(req.body.user_id))
}

export const rmProfile = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    for (const post of await PostModel.find({"artist.id": req.body.user_id})) {
        post.delete()
    }

    for (const comment of await CommentModel.find({writer_id: req.body.user_id})) {
        comment.delete()
    }

    for (const reply of await ReplyModel.find({writer_id: req.body.user_id})) {
        reply.delete()
    }

    await UserModel.findByIdAndDelete(req.body.user_id).exec()
    res.json({message: 'Account no longer exists'})
}
