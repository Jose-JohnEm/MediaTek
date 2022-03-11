import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'

export const getLikeds = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        const user = await UserModel.findById(req.body.user_id)
        var posts = []
    
        for (const post_id of user!.liked_ids!) {
            var post = await PostModel.findById(post_id)
            
            if (post) {
                posts.push(post)
            }
        }
        res.json(posts)
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}

export const addLiked = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        var post = await PostModel.findById(req.body.id)
        var msg: string = ''

        if (user!.liked_ids!.find((id) => id == req.body.id) == undefined) {
            post!.likes += 1
            user!.liked_ids!.push(req.body.id)
            msg = 'Like added'
        } else {
            msg = 'Already liked'
        }
        await user!.save()
        await post!.save()

        res.json({message: msg})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}

export const rmLiked = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        var post = await PostModel.findById(req.body.id)
        var msg: string = ''

        if (user!.liked_ids!.find((id) => id == req.body.id) != undefined) {
            post!.likes--
            user!.liked_ids!.splice(user!.liked_ids!.findIndex((id) => id == req.body.id), 1)
            msg = 'Just dislike'
        } else {
            msg = 'Already unliked'
        }
        await user!.save()
        await post!.save()

        res.json({message: msg})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}