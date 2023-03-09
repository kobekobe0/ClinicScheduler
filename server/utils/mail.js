import * as dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

/**
 *
 * Send Email through Send Grid API
 *
 * @param {String} fromMail
 * @param {String} toMail
 * @param {String} subject
 * @param {String} text
 * @param {String} html
 * @returns {Promise<*>}
 */
export const sendEmail = async (fromMail, toMail, subject, text, html) => {
  try {
    console.log("sendEmail: started", {
      fromMail,
      toMail,
      subject,
      text,
      html,
    });
    if (!toMail || !subject || !text || !html) {
      console.log("sendEmail: details not complete");
      return "Please complete the details to be sent.";
    }

    const accessToken = await OAuth2Client.getAccessToken();

    let transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MEDSURF_EMAIL || "admin@medsurf.co",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: fromMail, // Sender address
      to: toMail, // List of recipients
      subject, // Subject line
      text,
      html: html || "<strong>Hello, how are you! - MedSurf Team</strong>",
    };

    const info = await transport.sendMail(mailOptions);
    console.log("sendMail: info", { info });
    return info;
    // return await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    return error?.message;
  }
};
