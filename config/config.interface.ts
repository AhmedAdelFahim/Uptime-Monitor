export interface IConfig {
  PORT: number,
  DB_URL: string,
  JWT_KEY: string,
  REDIS_HOST: string,
  REDIS_PORT: number,
  EMAIL_HOST: string,
  EMAIL_PORT: number,
  EMAIL_USERNAME: string,
  EMAIL_PASSWORD: string,
  JWT_VERIFICATION_KEY: string,
  EMAIL_VERIFICATION_URL:string,
}
