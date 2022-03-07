import express from 'express';
import authware from './auth_middleware'

var router = express.Router()

router.use(authware)

const getProfile = (req: express.Request, res: express.Response) => {
    res.json({message: "Jure ça marche ta grand mère la pute"})
}

router.get('/', getProfile)

export default router