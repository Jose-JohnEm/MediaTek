import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'
import CommentModel from '../models/comments'
import ReplyModel from '../models/reply'

export const getProfile = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {

    res.json(await UserModel.findById(req.body.user_id))
}

//TODO: Supprimer les fichiers des posts sur le cloud
export const rmProfile = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    const user = await UserModel.findById(req.body.user_id)

    for (const post of await PostModel.find({"artist.id": req.body.user_id})) {
        post.delete()
    }

    for (const post_id of user!.liked_ids!) {
        const tmp = await PostModel.findById(post_id)
        if (tmp != undefined) {
            tmp!.likes--;
        }
        await tmp!.save()
    }

    for (const post of await PostModel.find()) {
        for (const comment of post.comments) {
            for (const reply of comment.replyes!) {
                reply.remove({writer_id: req.body.user_id})
            }
            comment.remove({writer_id: req.body.user_id})
        }
        await post.save()
    }
    await UserModel.findByIdAndDelete(req.body.user_id).exec()
    res.json({message: 'Account no longer exists'})
}
