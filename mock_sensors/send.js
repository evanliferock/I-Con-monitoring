var awsIoT = require('aws-iot-device-sdk');
var connect = require('./connect');

// Register our thing with its own shadow
connect.register('iotest');

// Responds to shadow updates
connect.on('status', function(thingName, stat, clientToken, stateObject) {
	if(stat == 'accepted') {
    console.log('Shadow updated for ' + thingName);
	}
	if(stat == 'rejected') {
		console.log('Shadow update failed for' + thingName);
	}
});

// Function to generate random integer in a range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update device shadow roughly every 5 seconds
// temp1: 1000-1999
// temp2: 2000-2999
// door1: Updates randomly
// door2: Updates randomly
// gate1: Changes 20s
// gate2: Changes 15s
// gate3: Changes 10s
// gate4: Changes 5s
var intervalNum = 0;
var d1 = 0; // door1
var d2 = 0; // door2
var g1 = 0; // gate1
var g2 = 0; // gate2
var g3 = 0; // gate3
var g4 = 0; // gate4
setInterval(function () {
    // Set random temperatures
		var t1 = getRandomInt(1000, 1999);
		var t2 = getRandomInt(2000, 2999);

    // Randomly update doors
		var rand = parseInt(Math.random() * 42);
		if((rand % 3) == 1) {
			d1 = d1 + 1;
		}
    if((rand % 4) == 1) {
      d2 = d2 + 1;
    }

    // Update gates
		if(intervalNum % 4 == 0) {
				g1 = g1 + 1;
		}
    if(intervalNum % 3 == 0) {
        g2 = g2 + 1;
    }
    if(intervalNum % 2 == 0) {
        g3 = g3 + 1;
    }
    g4 = g4 + 1;

		var state = {'state':
									{'reported':
											{'temp1': t1,
											 'temp2': t2,
											 'door1': d1,
                       'door2': d2,
											 'gate1': g1,
											 'gate2': g2,
                       'gate3': g3,
                       'gate4': g4
										  }
									 }
								 };
		// Update thing's shadow
		clientTokenUpdate = connect.update('iotest', state);

		if (clientTokenUpdate === null) {
        	console.log('update shadow failed, operation still in progress');
        }
		intervalNum = intervalNum + 1;
}, 5000);
