import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'

export const getSaveds = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        const user = await UserModel.findById(req.body.user_id)
        var posts = []

        for (const post_id of user!.saved_ids!) {
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

export const addSaved = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        var post = await PostModel.findById(req.body.id)
        var msg: string = ''

        if (user!.saved_ids!.find((id) => id == req.body.id) == undefined) {
            user!.saved_ids!.push(req.body.id)
            msg = 'save added'
        } else {
            msg = 'Already saved'
        }
        await user!.save()
        await post!.save()

        res.json({message: msg})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}

export const rmSaved = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        var user = await UserModel.findById(req.body.user_id)
        var post = await PostModel.findById(req.body.id)
        var msg: string = ''

        if (user!.saved_ids!.find((id) => id == req.body.id) != undefined) {
            user!.saved_ids!.splice(user!.saved_ids!.findIndex((id) => id == req.body.id), 1)
            msg = 'Just dissave'
        } else {
            msg = 'Already unsaved'
        }
        await user!.save()
        await post!.save()

        res.json({message: msg})
    }
    catch (err) {
        res.status(404).json({status: 404, message: err})
    }
}