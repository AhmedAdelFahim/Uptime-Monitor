import Queue, {Job} from "bull";
import {getConfig} from "../../config/config";
import {IURL} from "../modules/url/url.interface";
import {convertSecondsToCronFormat} from "./job-helper";

class JobScheduler {
  static _queue: any;

  static initializeScheduler(processCallback: Function) {
    this._queue = new Queue("job-scheduler", {
      redis: {
        host: getConfig().REDIS_HOST,
        port: getConfig().REDIS_PORT
      }
    })

    this._queue.process(async function (job: Job) {
      console.log(`Job ${job.id} running `, new Date());
      await processCallback(job.data)
    })
    this._queue.on("cleaned", function (jobs:any, type:string) {
      console.log("Cleaned %s %s jobs", jobs.length, type);
    })
    console.log("job scheduler initialized")
  }

  static async addJob(data: IURL) {
    const cron: string = convertSecondsToCronFormat(data.interval);
    console.log(cron,"LLLL")
    return this._queue.add(data, {
      repeat: {cron},
      jobId: data.id.toString(),
    });
  }

  static async removeJob(jobName: string) {
    const jobs = await this._queue.getRepeatableJobs();
    const jobToBeRemoved = jobs.find((job: Job) => job.id === jobName);
    if (jobToBeRemoved?.key) {
      await this._queue.removeRepeatableByKey(jobToBeRemoved.key)
    } else {
      console.log("job not found")
    }
  }

  static async removeAllJobs() {
    const jobs = await this._queue.getRepeatableJobs();
    jobs.forEach(async (job: any) => {
      await this._queue.removeRepeatableByKey(job.key)
    })
  }

  static clearCompletedJobs() {
    this._queue.clean(0);
    this._queue.clean(0,"failed");
  }

}

export default JobScheduler