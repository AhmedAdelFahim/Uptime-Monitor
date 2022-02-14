import {model, Model, Schema} from 'mongoose';
import {IURL, Protocol} from "./url.interface";
import MonitorLogsModel from "./monitor-logs/monitor-logs.model";

const URLSchema: Schema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: "User",},
  name: {type: String, required: true, unique: true,},
  url: {type: String, required: true},
  protocol: {type: String, required: true, enum: [Protocol.TCP, Protocol.HTTP, Protocol.HTTPS]},
  path: {type: String, optional: true, default: ""},
  webhook: {type: String, optional: true, default: ""},
  port: {type: Number, optional: true, min: 0, max: 65535},
  timeout: {type: Number, optional: true, default: 5},
  interval: {type: String, optional: true, default: "10m"},
  threshold: {type: Number, optional: true, default: 1},
  authentication: {
    username: {
      type: String, optional: true, default: ""
    },
    password: {
      type: String, optional: true, default: ""
    },
  },
  assert: {
    statusCode: {
      type: Number, optional: true
    },
  },
  tags: [{type: String, required: true}],
  ignoreSSL: {
    type: Boolean,
    optional: true
  },
  httpHeaders: {
    type: Map,
    of: String
  }
}, {timestamps: true});



URLSchema.post<IURL>('save', function (error: any, doc: IURL, next: Function) {
  if (error) {
    error.modelName = "URL";
    next(error);
  } else {
    next();
  }
});

URLSchema.pre('findOneAndDelete', async function(next) {
  const docToDeleted = await this.model.findOne(this.getQuery());
  await MonitorLogsModel.remove({urlId: docToDeleted?._id});
  console.log("logs deleted")
  next();
});

const URL: Model<IURL> = model('URL', URLSchema);
export default URL;