import app from './app';
import {checkEnvVariables, getConfig} from "./config/config";
import {startDbConnection} from "./config/db-connection";
import JobScheduler from "./src/utils/job-scheduler";
import {checkURL} from "./src/modules/url/url.service";
import {Redis} from "./src/utils/redis";
const start = async () => {
    checkEnvVariables();
    await startDbConnection();
    JobScheduler.initializeScheduler(checkURL);
    JobScheduler.removeAllJobs();
    JobScheduler.clearCompletedJobs();
    await Redis.initializeRedis();
    app.listen(getConfig().PORT, () => console.log(`Listening on port ${getConfig().PORT}!`));
};

start();