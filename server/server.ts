import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import auth from './src/authed/authenticator'
// rest of the code remains same

dotenv.config()

const app = express();

const PORT = process.env.PORT;

app.use((req: express.Request, res: express.Response, next: NextFunction) => {
    console.log(req.url)
    next()
})

app.use('/auth', auth)

app.get('/', (req: Request, res: Response) => {

    res.status(200).json({"message": "mes couilles sur ton front" })
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});