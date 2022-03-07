import express, {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


var authware_required = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (req.headers.authorization as string).split('Bearer ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') as JwtPayload;
      const userId = decodedToken.userIdl;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({
        error: error
      });
    }
}

export default authware_required