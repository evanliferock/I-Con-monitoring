var sql = require('./connections/db');

// Function to generate random integer in a range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set initial values of each mock sensor
var t1 = getRandomInt(1000, 1500);
var t2 = getRandomInt(1000, 1500);
var d1 = 0;
var d2 = 0;
var g1 = 0;
var g2 = 0;
var g3 = 0;
var g4 = 0;
var state;
setInterval(function () {
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
    }

    // Update gates based on specific rand value
    if(rand == 38) {
        g1 = 1;
    }
    if(rand == 39) {
        g2 = 1;
    }
    if(rand == 40) {
        g3 = 1;
    }
    if(rand == 41) {
        g4 = 1;
    }

    state = {"reported":
					{"temp1": t1,
					 "temp2": t2,
                     "door1": d1,
                     "door2": d2,
					 "gate1": g1,
                     "gate2": g2,
                     "gate3": g3,
                     "gate4": g4
                    }
                };

    // Insert mock data into DB
    sql.query('INSERT INTO mock_data SET ?', state.reported, function(err, result) {
        if(!err) {
            console.log('Mock Sensors Updated');
        } else {
            console.log('There was an error inserting mock state into the database');
        }
    }); 
    
    // Reset an gate variables that may have been set 
    g1 = 0;
    g2 = 0;
    g3 = 0;
    g4 = 0;
}, 1000);


