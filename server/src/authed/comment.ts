import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'
import CommentModel from '../models/comments'
import ReplyModel from '../models/reply'

export const addComment = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        
        if (req.body.parent == 'post') {
            var post = await PostModel.findById(req.body.id)
            var com = await CommentModel.create({
                comment: req.body.comment,
                writer_id: req.body.user_id,
                writer_pseudo: user!.pseudo
            })

            post!.comments!.push(com)
            post!.save()
        }
        else if (req.body.parent == 'comment') {
            var comment = await CommentModel.findById(req.body.id)
            var rep = await ReplyModel.create({
                comment: req.body.comment,
                writer_id: req.body.user_id,
                writer_pseudo: user!.pseudo
            })
            comment!.replyes!.push(rep)
            await comment!.save()
            await comment!.$parent()!.save()
        }
        else {
            throw 'Bad Parent value...'
        }
        res.json({message: 'Comment added'})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}

export const rmComment = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        
        if (req.body.parent == 'post') {
            await CommentModel.findByIdAndDelete(req.body.id).exec()
        }
        else if (req.body.parent == 'comment') {
            await ReplyModel.findByIdAndDelete(req.body.id).exec()
        }
        else {
            throw 'Bad Parent value...'
        }
        res.json({message: 'Comment no longer exists'})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}
