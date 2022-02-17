import {sendEmail} from '../../utils/email-sender/email-helper';
import {getConfig} from '../../../config/config';
import {generateJWT} from '../../utils/jwt-helper';
import {getVerificationMailHtml} from '../../utils/email-sender/email-template';

export async function sendVerificationMail(email: string) {
  const verificationToken = generateJWT({email}, getConfig().JWT_VERIFICATION_KEY, {expiresIn: '24h'});
  await sendEmail({
    from: getConfig().EMAIL_USERNAME,
    to: email,
    subject: 'Email Verification',
    html: getVerificationMailHtml(verificationToken),
  });
}
