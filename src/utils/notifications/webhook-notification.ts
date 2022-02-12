import {IWebhookNotification} from "./notification.interface";
import {IURL} from "../../modules/url/url.interface";
import {IMonitorLogs} from "../../modules/url/monitor-logs/monitor-logs.interface";
import {buildURL} from "../../modules/url/url.service";
import Axios from "../axios";

export async function notifyByWebhook(notificationData:IWebhookNotification) {
  try {
    await Axios.post(notificationData.webhookURL,{
      URLName: notificationData.urlName,
      status: notificationData.status,
      eventTime: notificationData.eventTime
    })
  } catch (e) {
    console.log("error in notifying by webhook")
  }

}

export  function prepareWebhookData(url:IURL,log:IMonitorLogs) : IWebhookNotification {
  return {
    urlName: url.name,
    eventTime:log.createdAt,
    status:log.status,
    url:buildURL(url).href,
    webhookURL: url?.webhook || "",
  }
}