import User from "../modules/user/user.model";
import {startDbConnection} from "../../config/db-connection";
import mongoose from "mongoose"
export const ValidUserForSigningUp = {
  "email":"reluttr@grecc.me",
  "password":"123456",
  "passwordConfirmation": "123456"
}

export const VerifiedUser = {
  _id:"6207a63a19fabbe6b9cacccc",
  email:"lenadzyubanova@sirkelmail.com",
  password: "123456",
  isVerified: true
}

export const NotVerifiedUser = {
  _id:"62066c4ca352a5a5edb71a93",
  email:"najadi4089@petloca.com",
  password: "123456",
  isVerified: false
}

export async function initializeDatabase() {
  await startDbConnection();
  await mongoose.connection.dropDatabase()
  await User.create(VerifiedUser);
  await User.create(NotVerifiedUser);
}

export async function teardown() {
  await mongoose.connection.close()
}