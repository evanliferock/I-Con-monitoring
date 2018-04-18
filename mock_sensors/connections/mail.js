var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'icon.notifications@gmail.com',
    pass: 'icon2017'
  }
});

module.exports = transporter;