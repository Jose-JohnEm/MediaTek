import express from 'express';
import authware from './auth_middleware'
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/users'

var router = express.Router()

router.use(authware)

const getProfile = async (req: express.Request<{},{}, JwtPayload>, res: express.Response) => {

    res.json(await UserModel.findById(req.body.user_id))
}

router.get('/', getProfile)

export default router