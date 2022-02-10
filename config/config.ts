import {IConfig} from "./config.interface";
import * as dotenv from "dotenv";

dotenv.config()
export const config = {
    development: {
        DB_URL: process.env.DB_DEVELOPMENT_URL,
        PORT: Number(process.env.PORT)
    },
    production: {
        DB_URL: process.env.DB_PRODUCTION_URL,
        PORT: Number(process.env.PORT)
    },
    test: {
        DB_URL: process.env.DB_TEST_URL,
        PORT: Number(process.env.PORT)
    }
}

export const checkEnvVariables = (): void => {
    const {NODE_ENV} = process.env;
    if (!NODE_ENV) {
        throw new Error('NODE_ENV must be defined!');
    }

    if (!process.env[`DB_${NODE_ENV.toUpperCase()}_URL`]) {
        throw new Error(`DB_${NODE_ENV.toUpperCase()}_URL must be defined!`);
    }
}

export const getConfig = (): IConfig => {
    // @ts-ignore
    return config[process.env.NODE_ENV!]!;
}