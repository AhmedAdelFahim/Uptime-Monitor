import {Request, Response, NextFunction} from 'express';
import {verifyJWT} from '../utils/jwt-helper';
import {getConfig} from '../../config/config';

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (!token) {
      const error = new Error('No Token Provided');
      // @ts-ignore
      error.code = 400;
      throw error;
    }
    const decoded = await verifyJWT(token.split(' ')?.[1] || '', getConfig().JWT_KEY);
    if (!decoded) {
      const error = new Error('Unauthorized');
      // @ts-ignore
      error.code = 401;
      throw error;
    }
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (e) {
    return next(e);
  }
}
