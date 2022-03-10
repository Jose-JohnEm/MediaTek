import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import auth from './src/authed/authenticator'
import AWS from 'aws-sdk'
import fs from 'fs'
import cors from 'cors'
import mongoose from 'mongoose'
import UserModel from './src/models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

app.post('/register', async (req: Request, res: Response) => {
  
  try {
    const { email, password, pseudo } = req.body;

    if (!(email && password && pseudo)) {
      return res.status(400).json({status: 400, message: "'email', 'password' and 'pseudo' are required"});
    }

    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send({status: 409, message: "User Already Exist. Please login"});
    }

    var encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      pseudo,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    console.log(user)

    const token = jwt.sign({user_id: user._id, email}, process.env.JWT_TOKEN as string, { expiresIn: "1h" });
    user.token = token;

    await user.save()

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(401).json({status: 401, message: err});
  }
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send({status: 400, message: "'email' and 'password' are required"});
    }
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_TOKEN as string, { expiresIn: "1h" });

      user.token = token;

      await user.save()

      return res.status(200).json(user);
    }
    return res.status(400).send({status: 400, message: "Invalid Credentials"});
  } catch (err) {
    console.log(err);
    return res.status(401).send({status: 401, message: err});
  }
})

app.use('/auth', auth)