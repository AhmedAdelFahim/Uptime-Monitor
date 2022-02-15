import app from './app';
import {checkEnvVariables, getConfig} from "./config/config";
import {startDbConnection} from "./config/db-connection";
import JobScheduler from "./src/utils/job-scheduler";
import {checkURL} from "./src/modules/url/url.service";
import {Redis} from "./src/utils/redis";
import Logger from "./src/middlewares/logger";
const start = async () => {
    checkEnvVariables();
    await startDbConnection();
    JobScheduler.initializeScheduler(checkURL);
    await JobScheduler.removeAllJobs();
    JobScheduler.clearCompletedJobs();
    await Redis.initializeRedis();
    app.listen(getConfig().PORT, () => Logger.log("info", `Listening on port ${getConfig().PORT}!`));
};

start();