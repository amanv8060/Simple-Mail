const nodemailer = require('nodemailer');

exports.sendEmail = (emailData) => {
  const transporter = nodemailer.createTransport({
    service: 'SendinBlue', // no need to set host or port etc.
    auth: {
        user: 'verma1090aman@gmail.com',
        pass: process.env.SENDINBLUEPASS
    }
  });

  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.error(`Problem send email: ${err}`));
};