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

  // Run email sending asynchronously so the frontend doesn't hang
  const sendEmailAsync = async () => {
    try {
      const transporter = nodemailer.createTransport({
        auth: config.auth,
        host: config.host,
        port: config.port,
        secure: config.secure,
      });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #062175; text-align: center;">Tour & Travellers</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <h3 style="color: #333;">Trip Request Received!</h3>
          <p style="color: #555; line-height: 1.6;">Hello,</p>
          <p style="color: #555; line-height: 1.6;">We have successfully received your trip request. Our team will review your requirements and get back to you shortly with availability and pricing.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Destination:</strong> ${destination}</p>
          </div>
          <p style="color: #555; line-height: 1.6;">We look forward to helping you plan the perfect journey.</p>
          <p style="color: #555; line-height: 1.6;">Best regards,<br><strong>Tour & Travellers Team</strong></p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Tour & Travellers" <${config.from}>`,
        subject: `Trip Request Received: ${destination}`,
        text: `Your request has been submitted. We will update you shortly for ${destination}.`,
        html: htmlContent,
        to: mail,
      });
      console.log(`Successfully sent trip request email to ${mail}`);
    } catch (error) {
      console.error("Failed to send trip request email:", error);
    }
  };

  // Fire and forget - do not await
  sendEmailAsync();

  return {
    sent: true,
  };
}
