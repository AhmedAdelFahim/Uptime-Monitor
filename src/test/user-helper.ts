import {generateJWT} from "../utils/jwt-helper";
import {getConfig} from "../../config/config";
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


export const token = generateJWT({userId:VerifiedUser._id,email:VerifiedUser.email,isVerified: true}, getConfig().JWT_KEY)

