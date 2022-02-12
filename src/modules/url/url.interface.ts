import {Document, Schema} from 'mongoose';

export enum Protocol {
  HTTP = "http",
  HTTPS = "https",
  TCP = "tcp"
}

export interface IAuthentication {
  username: string;
  password: string;
}

export interface IAssert {
  statusCode: number;

}

export interface IURL extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  url: string;
  protocol: Protocol;
  path?: string;
  port?: number;
  webhook?: string;
  timeout: number | 5; // seconds
  interval: number | 10; // minutes
  threshold: number | 1;
  authentication?: IAuthentication;
  httpHeaders?: object;
  assert?: IAssert;
  tags?: string[];
  ignoreSSL?: boolean;
}