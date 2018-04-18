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
    var temp1 = 70;
    var temp1c = checkTemperature(temp1);
    var post = {sensor: 'temp1', temp: temp1, color: temp1c};

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
