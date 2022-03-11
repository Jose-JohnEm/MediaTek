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

    for (const post of await PostModel.find({"comments.writer_id": req.body.user_id})) {
        for (const comment of post.comments) {
            for (const reply of comment.replyes!) {
                comment.remove({"replyes._id": reply._id})
            }
            post.remove({"comment._id": comment._id})
        }
    }

    await UserModel.findByIdAndDelete(req.body.user_id).exec()
    res.json({message: 'Account no longer exists'})
}
