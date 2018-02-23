var express = require('express');
var router = express.Router();
var sql = require('../connections/sql');

// Get most recent temp1
router.get('/temp/1', function(req, res, next) {
    console.log('Call to GET in iot/temp/1');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp1' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

// Get most recent temp2
router.get('/temp/2', function(req, res, next) {
    console.log('Call to GET in iot/temp/2');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp2' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

// Get most recent door
router.get('/door', function(req, res, next) {
    console.log('Call to GET in iot/door');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'door' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

// Get most recent switch
router.get('/switch', function(req, res, next) {
    console.log('Call to GET in iot/switch');
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'switch' ORDER BY timestamp DESC LIMIT 1", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

// Get last hour of temp1
router.get('/lasthour/temp1', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/temp1')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp1' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get last hour of temp2
router.get('/lasthour/temp2', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/temp2')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp2' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get last hour of door
router.get('/lasthour/door', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/door')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'door' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get last hour of switch
router.get('/lasthour/switch', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/switch')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'switch' AND timestamp >= NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

module.exports = router;