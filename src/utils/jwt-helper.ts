import jwt from "jsonwebtoken";
export function generateJWT(payload:any, secret: string,options={}) {
  return jwt.sign(payload, secret, options);
}
export function verifyJWT(token:string, secret: string) {
  return jwt.verify(token, secret);
}