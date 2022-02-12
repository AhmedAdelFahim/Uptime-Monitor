import {Document, Schema} from 'mongoose';

export enum RequestStatus {
  UP = "up",
  DOWN = "down"
}

export interface IMonitorLogs extends Document {
  urlId: Schema.Types.ObjectId;
  responseTime: number;
  status:RequestStatus;
  error:string;
  createdAt:Date
}