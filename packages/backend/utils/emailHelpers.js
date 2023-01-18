require('dotenv').config();

const nodemailer = require('nodemailer');

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_SENDER_APP_PSWD = process.env.EMAIL_SENDER_APP_PSWD;
function sendEmail({ emailTo, subject, message }) {
  console.log(
    `send email called with emailTo: "${emailTo}", subject: "${subject}", message:"${message}"`,
  );
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_SENDER_APP_PSWD,
    },
  });

  const mailOptions = {
    from: EMAIL_SENDER,
    to: emailTo,
    subject,
    text: message,
  };
  console.log('sending email');
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); // TODO: more robust logging
    } else {
      console.log('Email Sent: ' + info.response); // TODO: more robust logging
    }
  });
}

sendEmail({
  emailTo: 'henokkirubelwork@gmail.com',
  subject: 'This is a test email',
  message: 'Testing 123... testing 123...',
});

module.exports = { sendEmail };
