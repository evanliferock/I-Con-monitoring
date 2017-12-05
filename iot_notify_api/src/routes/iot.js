var mqtt = require('mqtt');
var express = require('express');
var router = express.Router();
var mail = require('../connections/mail');
var sql = require('../connections/sql');
var client = require('../connections/mqtt_client');
var parsed_message; // Variable to hold sensor values in between recieving, parsing and sending requests

// On client connect, subscribe to topic and log message
client.on('connect', function() {
		client.subscribe('mock/sensor');
		console.log('API successfully connected to Mosquitto');
});

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

// TODO: Compare gate data with planned maintenance to see if gate should be open
//
//       Add colors to the sensor's line in JSON file rather than in new array/object
parseData = function(data) {
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

// Everytime 'sensors' are updated
client.on('message', function(topic, message) {
	// Message parsing and console logging for debugging
	console.log('Message recieved from ' + topic);
	parsed_message = JSON.parse(message);
	parseData(parsed_message);
	console.log('Message successfuly parsed: ');
	console.log(parsed_message);
	
	// Insert parsed message into SQL DB
	sql.query('INSERT INTO messages2 SET ?', parsed_message.state.reported, function(error, results, fields) {
		if(error) throw error;
		else console.log('Message inserted into DB');
	});
})

/**********  'Main' Function **********/
// When requested, query DB for most recent entry and return
router.get('/', function(req, res, next) {
	console.log('Call to GET in IoT');
	sql.query('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 1', function(error, results, fields) {
		if(error) {
			res.send(error);
		}
	});
	res.end(JSON.stringify(parsed_message));
});

module.exports = router;
