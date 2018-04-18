var sql = require('./connections/db');
var checkSwitch = require('./checkSwitch');
var checkTemperature = require('./checkTemperature');

// Function to generate random integer in a range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var switches = true; // Change accordingly for testing
var state;
setInterval(function () {
    var temp1 = getRandomInt(60, 67);
    var temp1c = checkTemperature(temp1);
    var post = {sensor: 'temp1', temp: temp1, color: temp1c};

    // Insert mock data into DB
    sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(err, result) {
        if(!err) {
            console.log('Mock Sensors temp1 Updated', temp1);
        } else {
            console.log('There was an error inserting mock state into the database');
        }
    }); 

    var temp2 = getRandomInt(60, 67);
    var temp2c = checkTemperature(temp1);
    var post = {sensor: 'temp2', temp: temp2, color: temp2c};

    // Insert mock data into DB
    sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(err, result) {
        if(!err) {
            console.log('Mock Sensors temp2 Updated', temp1);
        } else {
            console.log('There was an error inserting mock state into the database');
        }
    }); 
}, 5000);


