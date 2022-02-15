import {Request, Response, NextFunction} from "express";
import {IUser} from "./user.interface";
import User from "./user.model";
import {generateJWT, verifyJWT} from "../../utils/jwt-helper";
import {getConfig} from "../../../config/config";
import {sendVerificationMail} from "./user.service";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const user: IUser = await User.create(req.body);
      sendVerificationMail(user.email);
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

  async verifyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const {params: {token}} = req;
      const payload = await verifyJWT(token, getConfig().JWT_VERIFICATION_KEY);
      console.log(payload)
      // @ts-ignore
      await User.verifyAccount(payload.email);
      res.status(200).send({message: "account is verified successfully"});
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();