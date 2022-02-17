import {NextFunction, Request, Response} from 'express';
import {errorMapping} from '../utils/custom-errors';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = errorMapping(err);
  res.status(errors.code).send(errors);
};
