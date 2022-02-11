import jwt from "jsonwebtoken";
export function generateJWT(payload:any, secret: string,options={}) {
  return jwt.sign(payload, secret, options);
}