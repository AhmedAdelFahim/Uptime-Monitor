import {Request, Response, NextFunction} from "express";
import {IURL} from "./url.interface";
import URL from "./url.model";
import JobScheduler from "../../utils/job-scheduler";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const {body, user} = req;
      const url: IURL =  await URL.create({...body, userId: user.userId})
      JobScheduler.addJob(url);
      res.status(201).send({message: "url is created successfully"});
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();