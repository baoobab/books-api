import transporter from '../config/mail';
import {MailOptions} from "nodemailer/lib/smtp-pool";
import createHttpError from "http-errors";
import {ERRORS_MESSAGES} from "../shared/enums";

export const sendConfirmationMail = async (mail: string, token: string) => {
  const confirmationUrl = `http://localhost:${process.env.API_PORT || 3000}/users/confirm?token=${token}`

  const options: MailOptions = {
    from: process.env.SMTP_FROM,
    to: mail,
    subject: 'Email confirmation',
    text: `Confirm your email by link: ${confirmationUrl}\n and after that - login to your account again`,
    html: `
            <p>Confirm your email by link:</p>
            <a href="${confirmationUrl}">${confirmationUrl}</a>
            <p>and after that - login to your account again</p>
        `,
  }

  try {
    await transporter.sendMail(options)
    return true
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}
