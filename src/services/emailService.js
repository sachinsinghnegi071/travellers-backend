import nodemailer from "nodemailer";

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;


  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    auth: {
      pass,
      user,
    },
    from,
    host,
    port,
    secure,
  };
}

export async function sendTripRequestConfirmation({ destination, mail }) {
  const config = getMailConfig();

  if (!config) {
    return {
      sent: false,
      reason: "Mail service is not configured yet.",
    };
  }

  const transporter = nodemailer.createTransport({
    auth: config.auth,
    host: config.host,
    port: config.port,
    secure: config.secure,
  });

  await transporter.sendMail({
    from: config.from,
    subject: "Trip request submitted",
    text: `Your req has been submitted. We will update you shortly for ${destination}.`,
    to: mail,
  });

  return {
    sent: true,
  };
}
