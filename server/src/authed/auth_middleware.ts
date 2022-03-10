import express, {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const config = process.env;

const authware = (req: Request<{},{}, JwtPayload>, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization as string).split(' ')[1];

  if (!token) {
    return res.status(403).send({status: 403, message: "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN as string);
    req.body = decoded as JwtPayload;
  } catch (err) {
    return res.status(401).send({status: 401, message: "Invalid Token"});
  }
  return next();
};

export default authware