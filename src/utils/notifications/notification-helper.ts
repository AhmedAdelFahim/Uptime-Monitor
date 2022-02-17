import {IURL} from '../../modules/url/url.interface';
import {IMonitorLogs, RequestStatus} from '../../modules/url/monitor-logs/monitor-logs.interface';
import {notifyByMail, prepareEmailData} from './email-notification';
import {IUser} from '../../modules/user/user.interface';
import User from '../../modules/user/user.model';
import {notifyByWebhook, prepareWebhookData} from './webhook-notification';
import {Redis} from '../redis';
import Logger from '../../middlewares/logger';

export async function notify(url: IURL, log: IMonitorLogs) {
  const user: IUser | null = await User.findOne({_id: url.userId});
  const oldCache = await Redis.getHash(url._id);
  if (Number(oldCache?.downs || 0) >= url.threshold || (oldCache?.newStatus === RequestStatus.UP && oldCache?.oldStatus === RequestStatus.DOWN)) {
    await Redis.setHash(url._id, 'downs', 0);
    if (user) {
      await notifyByMail(prepareEmailData(url, log, user));
    }
    if (url?.webhook && url.webhook.length !== 0) {
      await notifyByWebhook(prepareWebhookData(url, log));
    }
  } else {
    Logger.log('debug', `url ${url.name} doesn't reach threshold ${url.threshold}`);
  }
}
