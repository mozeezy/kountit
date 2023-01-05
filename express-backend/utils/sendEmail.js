const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, sendTo, sentFrom, replyTo) => {
  // Create an SMTP Nodemailer transporter - a protocol that is common for sending email.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: sentFrom,
    to: sendTo,
    subject: subject,
    replyTo: replyTo,
    html: message,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
