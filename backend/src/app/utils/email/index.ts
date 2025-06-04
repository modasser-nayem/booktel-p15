import nodemailer from "nodemailer";
import config from "../../config";
import { mailTemplate } from "./template";
import logger from "../logger";

const verifyEmail = async (email: string) => {
  try {
    const res = await fetch(
      `https://apilayer.net/api/check?access_key=${config.MAILBOXLAYER_ACCESS_KEY}&email=${email}&smtp=1&format=1`,
    );
    const data = await res.json();
    return data.smtp_check;
  } catch (error) {
    logger.error("Email verification failed!");
    return false;
  }
};

const sendEmail = async ({
  to,
  subject,
  htmlTemplate,
}: {
  to: string;
  subject: string;
  htmlTemplate: string;
}) => {
  const verify = await verifyEmail(to);

  if (!verify) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.NODE_ENV === "production",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: config.SMTP_USER, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    html: htmlTemplate, // html body
  });
};

export const emailHelper = { sendEmail, mailTemplate };
