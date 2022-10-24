import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Locals from '../providers/locals';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, Locals.config().appSecret, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.params.tokenEmail = user.email;
      req.params.tokenRole = user.role;
      req.params.tokenEmpId = user.empId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default verifyToken;
