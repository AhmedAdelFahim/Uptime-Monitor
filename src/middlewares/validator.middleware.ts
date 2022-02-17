import {IValidationSchema} from '../utils/joi.interface';
import {Request, Response, NextFunction} from 'express';

export function validateRequest(schema: IValidationSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.headers) {
        await schema.headers.validateAsync(req.headers);
      }
      if (schema.query) {
        await schema.query.validateAsync(req.query);
      }
      if (schema.params) {
        await schema.params.validateAsync(req.params);
      }
      if (schema.body) {
        await schema.body.validateAsync(req.body);
      }
      next();
    } catch (err) {
      return next(err);
    }
  };
}
