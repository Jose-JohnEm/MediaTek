import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import auth from './src/authed/authenticator'
import cors from 'cors'
import mongoose from 'mongoose'
import { login, register } from './src/sign/sign'
import { addPostView, getAllPosts } from './src/authed/posts';
import { awsMediaUpload } from './src/authed/awsUpload';

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

const PORT = process.env.PORT;

const successServerStarted = () => {
  console.log('MongoDB Connected succesfully !')
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string)
    app.listen(PORT, successServerStarted);
  }
  catch (error) {
    console.error(error)
  }
})()


///// Add custom debug middleware /////
app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  console.log(req.method, req.url)
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({status: 200})
})

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)
app.post('/posts/view', addPostView)

app.post('/aws', awsMediaUpload)

app.use('/auth', auth)