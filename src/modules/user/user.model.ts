import {model, Schema, Model} from 'mongoose';
import {IUser} from "./user.interface";
import * as bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true},
  isVerified: {type: Boolean, optional: true, default: false}
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

UserSchema.method("toJSON", function toJSON() {
  const user = this;
  return {
    email: user.email,
    userId: user._id,
    isVerified: user.isVerified,
  }
})

UserSchema.static("checkCredential", async function checkCredential(email, password) {
  const user: IUser = await this.findOne({email});
  const error: any = new Error("email or password is incorrect");
  error.code = 400;
  if (!user) {
    throw error;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw error;
  }
  if (!user.isVerified) {
    const error: any = new Error("email is not verified");
    error.code = 400;
    throw error;
  }
  return user.toJSON();
})

UserSchema.static("verifyAccount", async function verifyAccount(email,) {
  const user: IUser = await this.findOne({email});
  const error = new Error("this account doesn't exist");
  // @ts-ignore
  error.code = 404;
  if (!user) {
    throw error;
  }
  user.isVerified = true;
  await user.save()
  return user;
})
const User: Model<IUser> = model('User', UserSchema);
export default User