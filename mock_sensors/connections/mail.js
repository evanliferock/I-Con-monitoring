var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'xxx',
    pass: 'yyy'
  }
});

module.exports = transporter;