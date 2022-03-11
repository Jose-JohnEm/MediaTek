import express, {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/users'

const config = process.env;

const authware = async (req: Request<{},{}, JwtPayload>, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization as string).split(' ')[1];

  if (!token) {
    return res.status(403).send({status: 403, message: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN as string);
    req.body = {...req.body, ...decoded as JwtPayload};
    await UserModel.findById(req.body.user_id)
  } catch (err) {
    return res.status(401).send({status: 401, message: "Invalid Token"});
  }
  return next();
};

export default authware