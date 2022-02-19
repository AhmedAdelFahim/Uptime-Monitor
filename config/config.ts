import {IConfig} from './config.interface';
import * as dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    DB_URL: process.env.DB_DEVELOPMENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    QUEUE_NAME: process.env.QUEUE_NAME,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  production: {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_PRODUCTION_URL,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,

    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    QUEUE_NAME: process.env.QUEUE_NAME,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  test: {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_TEST_URL,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    QUEUE_NAME: process.env.QUEUE_NAME,
    SERVER_HOST: process.env.SERVER_HOST,
  },
};

export const checkEnvVariables = (): void => {
  const variablesToBeChecked: string[] = [
    'NODE_ENV',
    'JWT_KEY',
    'REDIS_URL',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USERNAME',
    'EMAIL_PASSWORD',
    'JWT_VERIFICATION_KEY',
    'EMAIL_VERIFICATION_URL',
    'QUEUE_NAME',
    'SERVER_HOST'];
  const {NODE_ENV} = process.env;
  variablesToBeChecked.forEach((variable: string) => {
    if (!process.env[variable]) {
      throw new Error(`${variable} must be defined!`);
    }
  });

  if (!process.env[`DB_${(NODE_ENV || '').toUpperCase()}_URL`]) {
    throw new Error(`DB_${(NODE_ENV || '').toUpperCase()}_URL must be defined!`);
  }
};

export const getConfig = (): IConfig => {
  // @ts-ignore
  return config[process.env.NODE_ENV!]!;
};
