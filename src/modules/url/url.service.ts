import {IURL, Protocol} from "./url.interface";
import {URL} from "url";
import Axios from "../../utils/axios";
import * as https from "https";
import {IMonitorLogs, RequestStatus} from "./monitor-logs/monitor-logs.interface";
import {saveLog} from "./monitor-logs/monitor-log.service";
import {notify} from "../../utils/notifications/notification-helper";
import {Redis} from "../../utils/redis";

export async function checkURL(data: IURL) {
  const log: any = {};
  log.urlId = data._id
  try {
    const config = buildRequestConfig(data);
    const response: any = await Axios(config);
    log.responseTime = response.config.metadata.duration
    if (data.assert?.statusCode) {
      if (data.assert.statusCode === response.status) {
        // UP
        log.status = RequestStatus.UP
      } else {
        // DOWN
        log.status = RequestStatus.DOWN
        log.error = "down with wrong assertion"
      }
    } else {
      // UP
      log.status = RequestStatus.UP
    }
  } catch (error: any) {
    // DOWN
    log.responseTime = error.config.metadata.duration
    log.status = RequestStatus.DOWN;
    log.error = error?.message || "";
  } finally {
    // save log
    const savedLog = await saveLog(log);
    await updateCachedURL(data, savedLog)
    notify(data, savedLog);
  }
}

export function buildURL(data: IURL) {
  const url = new URL(`${data.protocol}://${data.url}`);
  url.port = String(data.port || "");
  url.pathname = data.path || "";
  return url;
}

function buildRequestConfig(data: IURL) {
  const url = buildURL(data);
  const config: any = {
    method: 'get',
    url: url.href,
    headers: {
      ...data.httpHeaders
    },
    timeout: data.timeout * 1000,
  };
  if (data.protocol === Protocol.HTTPS) {
    config.httpsAgent = new https.Agent({
      rejectUnauthorized: !data.ignoreSSL
    })
  }
  if (data.authentication?.username !== "" && data.authentication?.password !== "") {
    config.auth = data.authentication
  }
  return config;
}

export async function updateCachedURL(url: IURL, log: IMonitorLogs) {
  const oldCache = await Redis.getHash(url._id);
  let downs = 0;
  let newStatus = log.status;
  let oldStatus = oldCache?.newStatus || "";
  if (oldCache?.newStatus === RequestStatus.DOWN && newStatus === RequestStatus.DOWN) {
    downs = Number(oldCache?.downs || 0) + 1;
  }
  await Redis.setHash(url._id, "downs", downs);
  await Redis.setHash(url._id, "newStatus", newStatus);
  await Redis.setHash(url._id, "oldStatus", oldStatus);
}