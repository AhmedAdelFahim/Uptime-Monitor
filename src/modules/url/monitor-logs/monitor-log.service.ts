import {IMonitorLogs} from "./monitor-logs.interface";
import MonitorLogsModel from "./monitor-logs.model";
import UrlModel from "../url.model";
export async function saveLog(log: IMonitorLogs) {
  const monitorLog: IMonitorLogs = await MonitorLogsModel.create(log);
  return monitorLog;
}

export async function getLogs({id, tag, userId}: any): Promise<IMonitorLogs[]> {
  const filter: any = {userId};
  if (id) filter._id = id;
  if (tag) filter.tags = tag;
  const urls = await UrlModel.find(filter);
  const urlIds = urls.map((url)=>{
    return url._id.toString();
  })
  return MonitorLogsModel.find({urlId:urlIds}).populate({
    path: 'urlId',
    populate: {
      path: "userId"
    }
  }).sort("-createdAt")
}