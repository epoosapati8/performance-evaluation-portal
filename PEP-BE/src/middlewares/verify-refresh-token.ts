import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Locals from '../providers/locals';

const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.refreshToken;
  if (token) {
    jwt.verify(token, Locals.config().refreshSecret, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.params.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default verifyRefreshToken;
