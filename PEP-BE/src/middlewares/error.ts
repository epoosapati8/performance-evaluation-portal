import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const errorMessages = (schema: Joi.Schema, property) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = [];
      details.map((i) => message.push(i.message));
      res.status(422).json({ error: message });
    }
  };
};
export default errorMessages;
