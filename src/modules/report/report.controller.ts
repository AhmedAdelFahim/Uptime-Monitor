import {NextFunction, Request, Response} from "express";
import {IMonitorLogs} from "../url/monitor-logs/monitor-logs.interface";
import {getLogs} from "../url/monitor-logs/monitor-log.service";
import {prepareReport} from "./report.service";

class ReportController {
  async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const logs:IMonitorLogs[] = await getLogs({...req.body,userId:req.user.userId});
      const report = prepareReport(JSON.parse(JSON.stringify(logs)))
      res.status(200).send({data:report})
    } catch (e) {
      return next(e);
    }
  }
}

export default new ReportController();