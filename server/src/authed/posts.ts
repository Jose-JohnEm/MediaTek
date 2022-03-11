import express from 'express'
import { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/users'
import PostModel from '../models/posts'

export const getPosts = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {

    res.json(await PostModel.find({"artist.id": req.body.user_id}))
}

export const addPost = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    const user = await UserModel.findById(req.body.user_id)

    res.json(await PostModel.create({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        src: req.body.src,
        artist: {
            name: user!.pseudo,
            id: user!._id
        }
    }))
}

export const rmPost = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {
    try {
        const user = await PostModel.findByIdAndRemove(req.body.id)

        if (user == undefined)
            throw 'Post does not exists...'
        
        res.json({message: 'Post no longer exists'})
    } catch (error) {
        res.status(404).json({status: 404, message: error})
    }
}
