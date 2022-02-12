import app from './app';
import {checkEnvVariables, getConfig} from "./config/config";
import {startDbConnection} from "./config/db-connection";
import JobScheduler from "./src/utils/job-scheduler";
import {checkURL} from "./src/modules/url/url.service";
const start = async () => {
    checkEnvVariables();
    await startDbConnection();
    JobScheduler.initializeScheduler(checkURL);
    JobScheduler.removeAllJobs();
    JobScheduler.clearCompletedJobs();
    app.listen(getConfig().PORT, () => console.log(`Listening on port ${getConfig().PORT}!`));
};

start();