import {Request, Response, NextFunction} from "express";
import {IUser} from "./user.interface";
import User from "./user.model";
import {generateJWT} from "../../utils/jwt-helper";
import {getConfig} from "../../../config/config";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser = await User.create(req.body);
      // TODO send email verification
      res.status(201).send({message: "sign up successfully"});
    } catch (e) {
      return next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {body: {email, password}} = req;
      // @ts-ignore
      const user = await User.checkCredential(email, password);
      const token = generateJWT(user, getConfig().JWT_KEY, {expiresIn: "24h"})
      res.status(200).send({message: "login successfully", data: {...user, token}});
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();