import {startDbConnection} from "../../config/db-connection";
import JobScheduler from "../utils/job-scheduler";
import {checkURL} from "../modules/url/url.service";
import {Redis} from "../utils/redis";
import mongoose from "mongoose";
import User from "../modules/user/user.model";
import {NotVerifiedUser, VerifiedUser} from "./user-helper";


export async function initializeDatabase() {
  await startDbConnection();
  JobScheduler.initializeScheduler(checkURL)
  await Redis.initializeRedis()
  await mongoose.connection.dropDatabase()
  await User.create(VerifiedUser);
  await User.create(NotVerifiedUser);
}

export async function teardown() {
  await mongoose.connection.close()
  JobScheduler.clearCompletedJobs()
  await JobScheduler.removeAllJobs()
  await JobScheduler.closeQueue()

}