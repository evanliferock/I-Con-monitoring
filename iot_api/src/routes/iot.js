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
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp1' AND timestamp > NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get last hour of temp2
router.get('/lasthour/temp2', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/temp2')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'temp2' AND timestamp > NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get last hour of switch
router.get('/lasthour/switch', function(req, res, next) {
    console.log('Call to GET in iot/lasthour/switch')
    sql.query("SELECT * FROM SENSOR_DATA WHERE sensor = 'switch' AND timestamp > NOW() - INTERVAL 1 HOUR", function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

/****************************** MOCK DATA ROUTES ******************************/
// Get most recent mock sensor data
router.get('/mock', function(req, res, next) {
    console.log('Call to GET in iot/mock');
    sql.query('SELECT * FROM MOCK_DATA ORDER BY timestamp DESC LIMIT 1', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
	});
});

// Get all mock sensor data over the last hour
router.get('/mock/lasthour', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour')
    sql.query('SELECT * FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock temp1 sensor data over the last hour
router.get('/mock/lasthour/temp1', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/temp1')
    sql.query('SELECT temp1 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock temp2 sensor data over the last hour
router.get('/mock/lasthour/temp2', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/temp2')
    sql.query('SELECT temp2 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock door1 sensor data over the last hour
router.get('/mock/lasthour/door1', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/door1')
    sql.query('SELECT door1 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock door2 sensor data over the last hour
router.get('/mock/lasthour/door2', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/door2')
    sql.query('SELECT door2 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock gate1 sensor data over the last hour
router.get('/mock/lasthour/gate1', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/gate1')
    sql.query('SELECT gate1 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock gate2 sensor data over the last hour
router.get('/mock/lasthour/gate2', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/gate2')
    sql.query('SELECT gate2 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock gate3 sensor data over the last hour
router.get('/mock/lasthour/gate3', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/gate3')
    sql.query('SELECT gate3 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

// Get all mock gate4 sensor data over the last hour
router.get('/mock/lasthour/gate4', function(req, res, next) {
    console.log('Call to GET in iot/mock/lasthour/gate4')
    sql.query('SELECT gate4 FROM MOCK_DATA WHERE timestamp > NOW() - INTERVAL 1 HOUR', function(error, results, fields) {
        if(error) res.send(error);
        else {
            res.send(results);
        }
    });
});

module.exports = router;