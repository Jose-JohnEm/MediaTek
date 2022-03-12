import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'

export const addComment = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        var post = await PostModel.findById(req.body.post_id)

        if (req.body.parent == 'post') {
            var com = {
                comment: req.body.comment || ' ',
                writer_id: req.body.user_id,
                writer_pseudo: user!.pseudo
            }

            post!.comments!.push(com)
            post!.save()
        }
        else if (req.body.parent == 'comment') {
            var rep = {
                comment: req.body.comment || ' ',
                writer_id: req.body.user_id,
                writer_pseudo: user!.pseudo
            }
            post!.comments!.id(req.body.comment_id)!.replyes?.push(rep)
            post!.save()
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

export const editComment = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var post = await PostModel.findById(req.body.post_id)

        if (req.body.parent == 'post') {
            post!.comments.id(req.body.comment_id)!.comment = req.body.comment || ' '
            post!.save()
        }
        else if (req.body.parent == 'comment') {
            post!.comments.id(req.body.comment_id)!.replyes!.id(req.body.reply_id)!.comment = req.body.comment || ' '
            post!.save()
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

export const rmComment = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var post = await PostModel.findById(req.body.post_id)

        if (req.body.parent == 'post') {
            post!.comments.remove({ _id: req.body.comment_id})
            post!.save()
        }
        else if (req.body.parent == 'comment') {
            post!.comments.id(req.body.comment_id)!.replyes!.remove({ _id: req.body.reply_id})
            post!.save()
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
