import {Request, Response, NextFunction} from "express";
import {IUser} from "./user.interface";
import User from "./user.model";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser = await User.create(req.body);
      // TODO send email verification
      res.status(201).send({message:"sign up successfully"});
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();