const nodemailer = require('nodemailer');

// const html = require('./html-template')

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
  debug: false,
  logger: true,
});

const sendEmail = async (email) => {
  const mailData = {
    from: `Remote Class<${process.env.EMAIL_SENDER}>`,
    to: email.to,
    // replyTo: {
    //     name: name,
    //     address: email,
    // },
    subject: email.subject,
    text: email.message, // plain text version of the message
    // html: html(email.subject, email.message, safe)
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err) => {
      // err, info
      if (err) {
        reject(new Error(err));
      } else {
        resolve({ message: 'Sent!' });
      }
    });
  });
};

module.exports = sendEmail;
