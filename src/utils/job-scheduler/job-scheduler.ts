import Queue, {Job} from 'bull';
import {getConfig} from '../../../config/config';
import {IURL} from '../../modules/url/url.interface';
import {convertIntervalToCronFormat} from './job-helper';
import Logger from '../../middlewares/logger';

class JobScheduler {
  static _queue: any;

  static initializeScheduler(processCallback: Function) {
    this._queue = new Queue(getConfig().QUEUE_NAME, {
      redis: {
        host: getConfig().REDIS_HOST,
        port: getConfig().REDIS_PORT,
      },
    });

    this._queue.process(async function(job: Job) {
      Logger.log('info', `Job ${job.id} running`);
      await processCallback(job.data);
    });
    this._queue.on('cleaned', function(jobs:any, type:string) {
      Logger.log('debug', `Cleaned ${jobs.length} ${type} jobs`);
    });
    Logger.log('info', 'job scheduler initialized');
  }

  static async addJob(data: IURL) {
    const cron: string = convertIntervalToCronFormat(data.interval);
    return this._queue.add(data, {
      repeat: {cron},
      jobId: data._id.toString(),
    });
  }

  static async removeJob(jobName: string) {
    const jobs = await this._queue.getRepeatableJobs();
    const jobToBeRemoved = jobs.find((job: Job) => job.id === jobName);
    if (jobToBeRemoved?.key) {
      await this._queue.removeRepeatableByKey(jobToBeRemoved.key);
      return jobToBeRemoved;
    } else {
      Logger.log('warn', 'job not found');
    }
  }

  static async removeAllJobs() {
    const jobs = await this._queue.getRepeatableJobs();
    jobs.forEach(async (job: any) => {
      await this._queue.removeRepeatableByKey(job.key);
    });
  }

  static clearCompletedJobs() {
    this._queue.clean(0);
    this._queue.clean(0, 'failed');
  }

  static async closeQueue() {
    await this._queue.close();
  }
}

export default JobScheduler;
