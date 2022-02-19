import {createClient} from 'redis';
import {getConfig} from '../../config/config';
import Logger from '../middlewares/logger';

export class Redis {
  static _client: any;

  static async initializeRedis() {
    this._client = createClient({
      url: getConfig().REDIS_URL,
    });

    this._client.on('error', (err: any) => Logger.log('error', `Redis Client Error ${JSON.stringify(err)}`));
    this._client.on('connect', () => Logger.log('info', 'Redis connected'));
    await this._client.connect();
  }

  static async setHash(key: string, field: string, value: any) {
    await this._client.HSET(key, field, value);
  }

  static async getHash(key: string) {
    return await this._client.HGETALL(key);
  }

  static async deleteKey(key:string) {
    return await this._client.DEL(key);
  }

  static async closeConnection() {
    return this._client.quit();
  }
}
