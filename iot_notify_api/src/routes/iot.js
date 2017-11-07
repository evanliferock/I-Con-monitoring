var awsIoT = require('aws-iot-device-sdk');
var express = require('express');
var router = express.Router();
var mail = require('../connections/mail');
var shadow = require('..connections/shadow');

function sendAlert(sensor, level) {
	let mailOptions = {
		from: '"iCon Notify System" <icon.notifications@gmail.com>',
	  to: 'brieckers@outlook.com',
	  subject: sensor + 'Alert!',
	  text: 'Sensor ' + sensor + ' is at danger level ' + level
	}
	mail.sendMail(mailOptions, (error, info) => {
	  if(error) {
	    return console.log(error);
	  }
	  console.log('Message send for sensor: ' + sensor + ' at level: ' + level);
	});
}
