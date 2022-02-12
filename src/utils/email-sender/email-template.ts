import {getConfig} from "../../../config/config";

export function getVerificationMailHtml(token:string) {
 return `Please user this link to verify your account <a href="${getConfig().EMAIL_VERIFICATION_URL}${token}"></a>/n Please note this link will expire after 24 hours`
}