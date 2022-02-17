import {RequestStatus} from '../../modules/url/monitor-logs/monitor-logs.interface';

export interface IEmailNotification extends INotification{
  receiverEmail: string;
}

export interface IWebhookNotification extends INotification{
  webhookURL: string;
}

export interface INotification {
  url:string;
  urlName: string;
  status: RequestStatus;
  eventTime: Date;
}
