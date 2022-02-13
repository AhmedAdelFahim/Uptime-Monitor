import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";

export function generateJWT(payload: any, secret: string, options = {}) {
  return jwt.sign(payload, secret, options);
}

export function verifyJWT(token: string, secret: string) {
  return new Promise(((resolve, reject) => {
    jwt.verify(token, secret, (err: any, payload: any) => {
      if(err) {
        const error:any = new Error("Unauthorized");
        error.code = 401;
        reject(error);
      }
      resolve(payload)
    });
  }))
}