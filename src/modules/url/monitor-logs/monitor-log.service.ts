import {IMonitorLogs} from "./monitor-logs.interface";
import MonitorLogsModel from "./monitor-logs.model";

export async function saveLog(log:IMonitorLogs) {
  const monitorLog:IMonitorLogs = await MonitorLogsModel.create(log);
  return monitorLog;
}