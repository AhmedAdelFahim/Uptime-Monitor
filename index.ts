import app from './app';
import {checkEnvVariables, getConfig} from "./config/config";
import {startDbConnection} from "./config/db-connection";

const start = async () => {
    checkEnvVariables();
    await startDbConnection();
    app.listen(getConfig().PORT, () => console.log(`Listening on port ${getConfig().PORT}!`));
};

start();