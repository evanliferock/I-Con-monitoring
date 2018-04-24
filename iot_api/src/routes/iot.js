var express = require('express');
var router = express.Router();
var sql = require('../connections/sql'); // Conects us to MySQL DB where sensor data is stored in SENSOR_DATA table

/**
 * @api {get} /iot/temp/1 Get most recent temp1 data
 * @apiVersion 1.0.0
 * @apiName RecentTemp1
 * @apiGroup Temperature
 * @apiPermission none
 * 
 * @apiDescription Fetches the most recent data in our database from the temp1 sensor
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Most recent temp1 value in F
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be temp1 in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page. Determined by checkTemperature.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/temp/1', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/temp/1');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp1' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

/**
 * @api {get} /iot/temp/2 Get most recent temp2 data
 * @apiVersion 1.0.0
 * @apiName RecentTemp2
 * @apiGroup Temperature
 * @apiPermission none
 * 
 * @apiDescription Fetches the most recent data in our database from the temp2 sensor
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Most recent temp2 value in F
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be temp2 in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page. Determined by checkTemperature.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/temp/2', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/temp/2');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp2' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

/**
 * @api {get} /iot/door Get most recent door count
 * @apiVersion 1.0.0
 * @apiName CurrentDoor
 * @apiGroup Door
 * @apiPermission none
 * 
 * @apiDescription Fetches the most recent data in our database from the door sensor
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Most recent door count
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be door in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page. Always green for doors
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/door', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/door');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'door' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

/**
 * @api {get} /iot/switch Get most recent switch state
 * @apiVersion 1.0.0
 * @apiName RecentSwitch
 * @apiGroup Switch
 * @apiPermission none
 * 
 * @apiDescription Fetches the most recent data in our database from the switch sensor
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Used for temperatures and doors, should always be NULL
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be switch in this case)
 * @apiSuccess {Number} open      Most recent switch state (0 - closed, 1 - open)
 * @apiSuccess {String} color     Proper sensor color for main page. Determined by checkSwitch.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/switch', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/switch');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'switch' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

/**
 * @api {get} /iot/lasthour/temp1 Get last hour of temp1 data
 * @apiVersion 1.0.0
 * @apiName LastHourTemp1
 * @apiGroup Temperature
 * @apiPermission none
 * 
 * @apiDescription Fetches the last hour of data from the temp1 sensor. Used for visualizing historical data on the main page
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Temp1 value in F at the timestamp in the same object
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be temp1 in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page at the timestamp. Determined by checkTemperature.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/lasthour/temp1', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/lasthour/temp1');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp1' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

/**
 * @api {get} /iot/lasthour/temp2 Get last hour of temp2 data
 * @apiVersion 1.0.0
 * @apiName LastHourTemp2
 * @apiGroup Temperature
 * @apiPermission none
 * 
 * @apiDescription Fetches the last hour of data from the temp2 sensor. Used for visualizing historical data on the main page
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Temp2 value in F at the timestamp in the same object
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be temp2 in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page at the timestamp. Determined by checkTemperature.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/lasthour/temp2', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/lasthour/temp2')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp2' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

/**
 * @api {get} /iot/lasthour/door Get last hour of door data
 * @apiVersion 1.0.0
 * @apiName LastHourDoor
 * @apiGroup Door
 * @apiPermission none
 * 
 * @apiDescription Fetches the last hour of data from the door sensor. Used for visualizing historical data on the main page
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Door count at the timestamp in the same object
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be door in this case)
 * @apiSuccess {Number} open      Used for switches, should always be NULL
 * @apiSuccess {String} color     Proper sensor color for main page at the timestamp. Should always be green for doors
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/lasthour/door', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/lasthour/door')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'door' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

/**
 * @api {get} /iot/lasthour/switch Get last hour of switch data
 * @apiVersion 1.0.0
 * @apiName LastHourSwitch
 * @apiGroup Switch
 * @apiPermission none
 * 
 * @apiDescription Fetches the last hour of data from the switch sensor. Used for visualizing historical data on the main page
 * 
 * @apiSuccess {Number} id        Unique number for the entry in the database
 * @apiSuccess {Number} temp      Used for temperatures and door, should always be NULL
 * @apiSuccess {String} sensor    Which sensor added the data to the database (should always be switch in this case)
 * @apiSuccess {Number} open      Switch state at the timestamp in the same object
 * @apiSuccess {String} color     Proper sensor color for main page at the timestamp. Determined by checkSwitch.js
 * @apiSuccess {String} timestamp Time of sensor update
 */
router.get('/lasthour/switch', function(req, res, next) {
    // Log everytime a call is made to this route
    console.log('Call to GET in iot/lasthour/switch')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'switch' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

module.exports = router;