import nodemailer, {Transporter} from "nodemailer";
import {IEmailConfig, IEmailMessage} from "./email.interface";
import {getConfig} from "../../../config/config";
import Logger from "../../middlewares/logger";

export function getEmailConfig() : IEmailConfig {

  return {
      host: getConfig().EMAIL_HOST,
      port: getConfig().EMAIL_PORT,
      secure: true,
      auth:{
        user: getConfig().EMAIL_USERNAME,
        pass: getConfig().EMAIL_PASSWORD
      }
  }
}

export function getTransporter(emailConfig:IEmailConfig) {
  return nodemailer.createTransport(emailConfig);
}

export async function sendEmail(message:IEmailMessage) {
  const transporter:Transporter = getTransporter(getEmailConfig());
  const info = await transporter.sendMail(message);
  Logger.log("debug",`Message sent: ${info.messageId}`);

}