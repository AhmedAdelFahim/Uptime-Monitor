import {sendEmail} from "../email-sender/email-helper";
import {getConfig} from "../../../config/config";
import {getNotificationEmailHtml} from "../email-sender/email-template";
import {IEmailNotification} from "./notification.interface";
import {IURL} from "../../modules/url/url.interface";
import {IMonitorLogs} from "../../modules/url/monitor-logs/monitor-logs.interface";
import {IUser} from "../../modules/user/user.interface";
import {buildURL} from "../../modules/url/url.service"
import Logger from "../../middlewares/logger";
export async function notifyByMail(notificationData:IEmailNotification) {
  try {
    await sendEmail({
      from: getConfig().EMAIL_USERNAME,
      to: notificationData.receiverEmail,
      subject: `Monitor is ${notificationData.status}`,
      html: getNotificationEmailHtml(notificationData)
    })
  } catch (e) {
    Logger.log("warn","error in notifying by mail")
  }

}

export  function prepareEmailData(url:IURL,log:IMonitorLogs,user:IUser) : IEmailNotification {
  return {
    urlName: url.name,
    receiverEmail:user.email,
    eventTime:log.createdAt,
    status:log.status,
    url:buildURL(url).href
  }
}