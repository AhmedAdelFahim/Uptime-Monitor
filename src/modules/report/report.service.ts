import {IMonitorLogs, RequestStatus} from "../url/monitor-logs/monitor-logs.interface";

export function convertIntervalToSeconds(interval: string) {
  const intervalNumber = Number(`${interval[0]}${interval[1]}`);
  const intervalUnit = interval[2];
  if (intervalUnit === "m") return intervalNumber * 60;
  else return intervalNumber * 60 * 60;

}

export function prepareReport(logs: IMonitorLogs[]) {
  const report: any = {};
  const count = logs.length;
  report.downtime = 0;
  report.uptime = 0;
  report.responseTime = 0;
  report.outages = 0;
  logs.forEach((log) => {
    report.responseTime += log.responseTime;
    if(log.status === RequestStatus.DOWN) {
      report.outages;
      // @ts-ignore
      report.downtime += (convertIntervalToSeconds(log?.urlId?.interval))
    } else {
      // @ts-ignore
      report.uptime += (convertIntervalToSeconds(log?.urlId?.interval))
    }
    report.availability = (report.uptime/(report.uptime+report.downtime))*100;
  })
  report.responseTime /= count;
  report.history = logs.map((log: any) => {
    delete log.urlId;
    return log;
  })
  return report;
}