var sql = require('./connections/db');
var checkSwitch = require('./checkSwitch');
var checkTemperature = require('./checkTemperature');

// Function to generate random integer in a range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Alot of stuff was commented out to simplify the function for testing */
// Set initial values of each mock sensor
//var t1 = getRandomInt(1000, 1500);
//var t2 = getRandomInt(1000, 1500);
//var d1 = 0;
//var d2 = 0;
var switches = false; // Change accordingly for testing
var state;


setInterval(function () {
    /*
    // Random number to use for various things
    var rand = parseInt(Math.random() * 42);

    // Update temperatures by adding/subtracting a random value
    if((rand % 2) == 1) {
        t1 += getRandomInt(1, 10);
        t2 += getRandomInt(1, 10);
    } else {
        t1 -= getRandomInt(1, 10);
        t2 -= getRandomInt(1, 10);
    }

    // Update doors based on random value
	if((rand % 3) == 1) {
        d1 += 1;
    }
    if((rand % 4) == 1) {
        d2 += 1;
    }*/


    // Insert mock data into DB
    var switchColor = checkSwitch(switches);
    var postSwitches = {sensor: 'switch', open: Number(switches), color: switchColor};
    sql.query('INSERT INTO SENSOR_DATA SET ?', postSwitches, function(err, result) {
        if(!err) {
            console.log('Mock Sensors Updated' + switchColor);
        } else {
            console.log('There was an error inserting mock state into the database');
        }
    });
}, 5000);
