import {Request, Response, NextFunction} from "express";
import {IURL} from "./url.interface";
import URL from "./url.model";
import JobScheduler from "../../utils/job-scheduler/job-scheduler";
import {Redis} from "../../utils/redis";
import {Job} from "bull";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const {body, user} = req;
      const url: IURL = await URL.create({...body, userId: user.userId})
      const job: Job = await JobScheduler.addJob(url);
      res.status(201).send({message: "url is created successfully"});
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const {body, user, params: {id}} = req;
      const updatedURL: IURL | null = await URL.findOneAndUpdate({userId: user.userId, _id: id}, body, {new: true})
      if (!updatedURL) {
        const error: any = new Error("URL not found");
        error.code = 404;
        throw error;

      }
      await JobScheduler.removeJob(id);
      const job: Job = await JobScheduler.addJob(updatedURL);
      res.status(200).send({message: "url is updated successfully"});
    } catch (e) {
      return next(e);
    }
  }

  async getURLs(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const {user} = req;
      const urls: IURL[] = await URL.find({userId: user.userId});
      res.status(200).send({data: urls})
    } catch (e) {
      return next(e);
    }
  }

  async deleteURL(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const {params: {id}, user} = req;
      const deletedURL: IURL | null = await URL.findOneAndDelete({_id: id, userId: user.userId});
      if (!deletedURL) {
        const error: any = new Error("URL not found");
        error.code = 404;
        throw error;

      }
      await Redis.deleteKey(id)
      await JobScheduler.removeJob(id);
      res.status(200).send({message: "URL is deleted successfully"})
    } catch (e) {
      return next(e);
    }
  }
}

export default new UserController();