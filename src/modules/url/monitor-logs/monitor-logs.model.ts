import {model, Model, Schema} from 'mongoose';
import {IMonitorLogs, RequestStatus} from './monitor-logs.interface';

const MonitorLogsSchema: Schema = new Schema({
  urlId: {type: Schema.Types.ObjectId, required: true, ref: 'URL'},
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  status: {type: String, required: true, enum: [RequestStatus.UP, RequestStatus.DOWN]},
  responseTime: {type: Number, required: true},
  error: {type: String, optional: true, default: ''},
}, {timestamps: true});

const MonitorLog: Model<IMonitorLogs> = model('MonitorLog', MonitorLogsSchema);
export default MonitorLog;
