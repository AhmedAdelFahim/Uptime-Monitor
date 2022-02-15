import {Protocol} from "../modules/url/url.interface";
import UrlModel from "../modules/url/url.model";
import {VerifiedUser} from "./user-helper";
import {URLInserted, URLToDeleted} from "./url-helper";
import {RequestStatus} from "../modules/url/monitor-logs/monitor-logs.interface";
import MonitorLog from "../modules/url/monitor-logs/monitor-logs.model";

export const URL = {
  _id: "620a865484d2d07b659de340",
  "userId": VerifiedUser._id,
  "name": "url-20",
  "url": "google.com",
  "protocol": Protocol.HTTPS,
  "tags": ["tag3"],
  "interval": "03m",
  "threshold": 2,
  "httpHeaders": {
    "Content-Type": "application/json"
  },
  ignoreSSL: false
}

export const URLToGetReportByTag = {
  _id: "620a865484d2d07b659de341",
  "userId": VerifiedUser._id,
  "name": "url-21",
  "url": "google.com",
  "protocol": Protocol.HTTPS,
  "tags": ["tag8"],
  "interval": "03h",
  "threshold": 2,
  "httpHeaders": {
    "Content-Type": "application/json"
  },
  ignoreSSL: false
}

export const logs = [
  {
    _id: "620ab5b0e33700e1bfd1fc82",
    responseTime: 1,
    status: RequestStatus.DOWN,
    urlId: URLToGetReportByTag._id,
    userId: VerifiedUser._id,
    error: "connect ECONNREFUSED 127.0.0.1:9000"
  },
  {
    _id: "620ab5b0e33700e1bfd1fc85",
    responseTime: 4,
    status: RequestStatus.UP,
    urlId: URLToGetReportByTag._id,
    userId: VerifiedUser._id,
  },
  {
    _id: "620ab574e33700e1bfd1fc7e",
    responseTime: 5,
    status: RequestStatus.UP,
    urlId: URL._id,
    userId: VerifiedUser._id
  },
  {
    _id: "620ab5b0e33700e1bfd1fc81",
    responseTime: 1,
    status: RequestStatus.DOWN,
    urlId: URL._id,
    userId: VerifiedUser._id,
    error: "connect ECONNREFUSED 127.0.0.1:9000"
  },
  {
    _id: "620abed4fa98711fcd4c284e",
    responseTime: 8,
    status: RequestStatus.UP,
    urlId: URL._id,
    userId: VerifiedUser._id
  },
  {
    _id: "620ab5ece33700e1bfd1fc84",
    responseTime: 2,
    status: RequestStatus.UP,
    urlId: URL._id,
    userId: VerifiedUser._id
  }
]

export async function initializeLogsForTesting() {
  await UrlModel.create(URL);
  await UrlModel.create(URLToGetReportByTag);
  await MonitorLog.create(logs)
}
