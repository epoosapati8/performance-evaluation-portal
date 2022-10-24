import { Request, Response, NextFunction } from 'express';

const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { tokenRole }
  } = req;

  if (tokenRole === 'hrManager') {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default verifyRole;
