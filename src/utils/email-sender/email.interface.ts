export interface IEmailConfig {
  host:string;
  port:number;
  secure:boolean;
  auth:IEmailAuth
}

interface IEmailAuth {
  user:string;
  pass:string;
}

export interface IEmailMessage {
  from: string,
  to: string,
  subject:string,
  text?:string,
  html:string
}
