const nodemailer = require("nodemailer");
const db = require("../config/db");

async function getSetting(key) {

  const [rows] =
    await db.execute(
      `
      SELECT setting_value
      FROM app_settings
      WHERE setting_key = ?
      `,
      [key]
    );

  return rows[0]?.setting_value;
}

async function sendTestEmail(
  recipient
) {

  try {

    const smtpHost =
      await getSetting("smtp_host");

    const smtpPort =
      await getSetting("smtp_port");

    const smtpSSL =
      await getSetting("smtp_ssl");

    const smtpUser =
      await getSetting("smtp_user");

    const smtpPassword =
      await getSetting("smtp_password");

    const senderEmail =
      await getSetting(
        "smtp_sender_email"
      );

    const senderName =
      await getSetting(
        "smtp_sender_name"
      );

    const transporter =
      nodemailer.createTransport({

        host: smtpHost,

        port: Number(smtpPort),

        secure:
          smtpSSL === "1",

        auth: {
          user: smtpUser,
          pass: smtpPassword
        }

      });

    await transporter.sendMail({
  from:
    `"${senderName}" <${senderEmail}>`,
  to: recipient,
  subject: "SMTP Test",
  text:
    "Votre configuration SMTP fonctionne."
});

return true;

  } catch (error) {

  console.error(error);

  if (
    error.message.includes(
      "Too many emails per second"
    )
  ) {

    throw new Error(
      "SMTP_RATE_LIMIT"
    );

  }

  if (
    error.message.includes(
      "wrong version number"
    )
  ) {

    throw new Error(
      "SMTP_SSL_ERROR"
    );

  }

  if (
    error.message.includes(
      "Invalid login"
    )
  ) {

    throw new Error(
      "SMTP_AUTH_ERROR"
    );

  }

  throw new Error(
    "SMTP_UNKNOWN_ERROR"
  );

}

}

module.exports = {
  sendTestEmail
};