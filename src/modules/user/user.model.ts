import {model, Schema, Model} from 'mongoose';
import {IUser} from "./user.interface";
import * as bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true}
}, {timestamps: true});



UserSchema.pre<IUser>('save', async function (next) {
  const user = this;
  const saltRounds = 8;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

UserSchema.post<IUser>('save', function (error: any, doc: IUser, next: Function) {
  if (error) {
    error.modelName = "User";
    next(error);
  } else {
    next();
  }
});
const User: Model<IUser> = model('User', UserSchema);
export default User