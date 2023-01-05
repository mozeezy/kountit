const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (
  subject,
  name,
  sendTo,
  sentFrom,
  replyTo,
  resetURL
) => {
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
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  const options = {
    from: sentFrom,
    to: sendTo,
    subject: subject,
    replyTo: replyTo,
    template: "email",
    context: {
      name: name,
      resetURL: resetURL,
    },
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
