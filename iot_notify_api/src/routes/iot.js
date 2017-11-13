var awsIoT = require('aws-iot-device-sdk');
var express = require('express');
var router = express.Router();
var mail = require('../connections/mail');
var shadow = require('../connections/shadow');

// TODO: Only send out 1 alert by checking timestamp
function sendAlert(sensor, level) {
	let mailOptions = {
		from: '"iCon Notify System" <icon.notifications@gmail.com>',
	  to: 'brieckers@outlook.com',
	  subject: sensor + 'Alert!',
	  text: 'Sensor ' + sensor + ' is at danger level ' + level
	}
	mail.sendMail(mailOptions, (error, info) => {
	  if(error) {
			console.log('Error in sending message');
	    return console.log(error);
	  }
	  console.log('Message send for sensor: ' + sensor + ' at level: ' + level);
	});
}

// Register this device with our thing's (gateway) shadow
shadow.register('iotest');

// TODO: Compare gate data with planned maintenance to see if gate should be open
//
//       Add colors to the sensor's line in JSON file rather than in new array/object
var parseData = function(data) {
	switch(true) { // Temp 1
		case(data.state.reported.temp1 > 2000):
			data.state.reported['t1c'] = '#ff0000';
			//sendAlert('Temp1', 'Red');
			break;
		case(data.state.reported.temp1 > 1500):
			data.state.reported['t1c'] = '#ffff00';
		  break;
		default:
			data.state.reported['t1c'] = '#00cc00';
	}
	switch(true) { // Temp 2
		case(data.state.reported.temp2 > 3000):
			data.state.reported['t2c'] = '#ff0000';
			//sendAlert('Temp2', 'Red');
			break;
		case(data.state.reported.temp2 > 2500):
			data.state.reported['t2c'] = '#ffff00';
			break;
		default:
			data.state.reported['t2c'] = '#00cc00';
	}
	switch(true) { // Gate 1
		case(data.state.reported.gate1 % 2 == 1):
			data.state.reported['g1c'] = '#ff0000';
			break;
		default:
			data.state.reported['g1c'] = '#00cc00';
	}
	switch(true) { // Gate 2
		case(data.state.reported.gate2 % 2 == 1):
			data.state.reported['g2c'] = '#ff0000';
			break;
		default:
			data.state.reported['g2c'] = '#00cc00';
	}
	switch(true) { // Gate 3
		case(data.state.reported.gate3 % 2 == 1):
			data.state.reported['g3c'] = '#ff0000';
			break;
		default:
			data.state.reported['g3c'] = '#00cc00';
	}
	switch(true) { // Gate 4
		case(data.state.reported.gate4 % 2 == 1):
			data.state.reported['g4c'] = '#ff0000';
			break;
		default:
			data.state.reported['g4c'] = '#00cc00';
	}
}

// TODO: Make sure alert doesn't send out with ever request
//       Maybe use timestamp of alert to do this?
var parsed;
router.get('/', function(req, res, next) {
	//console.log('Get requested for /iot')
	// Get thing's (gateway) shadow
	shadow.get('iotest');
	// When AWS resonds, send respective HTTP response
	shadow.on('status', function(thingName, stat, clientToken, stateObject) {
		if(stat == 'accepted') {
			parsed = parseData(stateObject);
			//res.end(JSON.stringify(parsed));
			res.end(JSON.stringify(stateObject));
		}
		else {
			console.log('Error in fetching device shadow');
			res.end('Error in fetching device shadow');
		}
	});
});

module.exports = router;
