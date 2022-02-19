import {getConfig} from '../../../config/config';
import {IEmailNotification} from '../notifications/notification.interface';

export function getVerificationMailHtml(token:string) {
  return `Please user this link to verify your account <a href="${getConfig().SERVER_HOST}${getConfig().EMAIL_VERIFICATION_URL}${token}">Verify</a> Please note this link will expire after 24 hours`;
}

export function getNotificationEmailHtml(emailData:IEmailNotification) {
  return `Hi,
  </br>
 The monitor ${emailData.urlName} (${emailData.url}) is currently ${emailData.status}
 </br>
 Event timestamp: ${new Date(emailData.eventTime).toUTCString()}`;
}
