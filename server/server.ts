import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import auth from './src/authed/authenticator'
import AWS from 'aws-sdk'
import fs from 'fs'
import cors from 'cors'
import mongoose from 'mongoose'
import UserModel from './src/models/users'

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
  console.log(req.url)
  next()
})


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({status: 200 })
})
app.use('/auth', auth)