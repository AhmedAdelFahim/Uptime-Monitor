import {IConfig} from "./config.interface";
import * as dotenv from "dotenv";

dotenv.config()
export const config = {
    development: {
        DB_URL: process.env.DB_DEVELOPMENT_URL,
        PORT: Number(process.env.PORT),
        JWT_KEY: process.env.JWT_KEY,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: Number(process.env.REDIS_PORT),
    },
    production: {
        DB_URL: process.env.DB_PRODUCTION_URL,
        PORT: Number(process.env.PORT),
        JWT_KEY: process.env.JWT_KEY,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: Number(process.env.REDIS_PORT),
    },
    test: {
        DB_URL: process.env.DB_TEST_URL,
        PORT: Number(process.env.PORT),
        JWT_KEY: process.env.JWT_KEY,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: Number(process.env.REDIS_PORT),
    }
}

export const checkEnvVariables = (): void => {
    const {NODE_ENV, JWT_KEY, REDIS_PORT, REDIS_HOST} = process.env;
    if (!NODE_ENV) {
        throw new Error('NODE_ENV must be defined!');
    }

    if (!JWT_KEY) {
        throw new Error('JWT_KEY must be defined!');
    }

    if (!JWT_KEY) {
        throw new Error('REDIS_PORT must be defined!');
    }

    if (!JWT_KEY) {
        throw new Error('REDIS_HOST must be defined!');
    }

    if (!process.env[`DB_${NODE_ENV.toUpperCase()}_URL`]) {
        throw new Error(`DB_${NODE_ENV.toUpperCase()}_URL must be defined!`);
    }
}

export const getConfig = (): IConfig => {
    // @ts-ignore
    return config[process.env.NODE_ENV!]!;
}