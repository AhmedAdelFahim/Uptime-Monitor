import {createClient} from 'redis';

export class Redis {
  static _client: any;

  static async initializeRedis() {
    this._client = createClient();

    this._client.on('error', (err: any) => console.log('Redis Client Error', err));
    this._client.on("connect", () => console.log('Redis connected'))
    await this._client.connect();
  }

  static async setHash(key: string, field: string, value: any) {
    await this._client.HSET(key, field, value)
  }

  static async getHash(key: string) {
    return await this._client.HGETALL(key)
  }
}