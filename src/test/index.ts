import {startDbConnection} from "../../config/db-connection";
import JobScheduler from "../utils/job-scheduler/job-scheduler";
import {checkURL} from "../modules/url/url.service";
import {Redis} from "../utils/redis";
import mongoose from "mongoose";
import {initializeUsersForTesting} from "./user-helper";
import {initializeURLForTesting} from "./url-helper";
import {initializeLogsForTesting} from "./report-helper";


export async function initialize() {
  await startDbConnection();
  JobScheduler.initializeScheduler(checkURL)
  await Redis.initializeRedis()
  await mongoose.connection.dropDatabase()
  await initializeUsersForTesting()
  await initializeURLForTesting()
  await initializeLogsForTesting();
}

export async function teardown() {
  await mongoose.connection.close()
  JobScheduler.clearCompletedJobs()
  await JobScheduler.removeAllJobs()
  await JobScheduler.closeQueue()
  await Redis.closeConnection()

}