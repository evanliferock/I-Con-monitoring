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

module.exports = function sendAlert(status, message) {
	let mailOptions = {
		from: '"iCon Notify System" <icon.notifications@gmail.com>',
	  to: 'brieckers@outlook.com',
	  subject: 'Alert: switch is ' + status + "!",
	  text: message
	}
	transporter.sendMail(mailOptions, (error, info) => {
	  if(error) {
			console.log('Error in sending message');
	    return console.log(error);
	  }
	  console.log('Message sent for switch')
	});
};