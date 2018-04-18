// https://www.restapiexample.com/rest-api-tutorial/create-rest-api-using-node-js-mysql-express/
// base extension is /maintenance
var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');

// GET ALL UPCOMING MAINTENANCE with corresponding usernames
router.get('/', function (req, res) {
    connection.query('SELECT m.maintenance_id, m.start_date_time, e.name AS equipment_name, u.username, u.user_id ' +
    'FROM MAINTENANCE m, EQUIPMENT e, USER u ' +
    'WHERE m.equipment_id = e.equipment_id AND m.user_id = u.user_id AND is_complete = 0 AND is_canceled = 0 ' +
    'ORDER BY start_date_time ASC;', function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});

// get upcoming dates and times
router.get('/time', function (req, res) {
    connection.query('SELECT start_date_time FROM MAINTENANCE WHERE start_date_time >= NOW()', function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});

// GET UPCOMING MAINTENANCE FOR USER
router.get('/:user_id', function (req, res) {
    var params = req.params;
    connection.query('SELECT maintenance_id, start_date_time, name AS equipment_name FROM MAINTENANCE, EQUIPMENT ' +
            'WHERE MAINTENANCE.equipment_id = EQUIPMENT.equipment_id ' +
            'AND is_complete = 0 AND is_canceled = 0 AND user_id = ? ORDER BY start_date_time ASC', [params.user_id],
        function (error, results, fields) {
            if (error) res.send(error);
            else res.send(results);
        });
});

/*
// GET A MAINTENANCE
router.get('/maintenance/:id', function (req, res) {
   connection.query('SELECT * FROM MAINTENANCE WHERE maintenance_id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});*/

// Plan maintenance
router.post('/', function (req, res) {
    var params = req.body;
    params.is_complete = 0;
    params.is_canceled = 0;
    // Based on Format YYYY-MM-DD

    connection.query('SELECT start_date_time, equipment_id, location_id FROM MAINTENANCE WHERE start_date_time = ? AND equipment_id = ? AND location_id = ?', [params.start_date_time, params.equipment_id, params.location_id], function (error, results, fields) {
        if (error) console.log(error);
        else {
          if (results[0]){
              res.status(300);
              res.send("ERROR: Maintenance already exists" )
          }
        }
    });

    if (new Date().getTime() <= new Date(params.start_date_time).getTime()) {
        connection.query('INSERT INTO MAINTENANCE SET ?', [params], function (error, results, fields) {
            if (error) res.send(error);
            else res.send(results);

        });
    } else {
        res.status(400);
        res.send("ERROR: Date is in the past");
    }
});

// SET AS COMPLETE
router.put('/complete/:id', function (req, res) {
    var params = req.params;
    modify_maintenance(req, res, params.id, 
        () => connection.query('UPDATE MAINTENANCE SET is_complete = 1 WHERE is_complete = 0 AND is_canceled = 0 AND maintenance_id = ?',
            [params.id], function (error, results, fields) {
            if (error) res.send(error);
            else res.send(results);
        })
    )
});

// SET AS CANCELED
router.put('/cancel/:id', function (req, res) {
    var params = req.params;
    modify_maintenance(req, res, params.id, 
        () => connection.query('UPDATE MAINTENANCE SET is_canceled = 1 WHERE is_complete = 0 AND is_canceled = 0 AND maintenance_id = ?',
                [params.id], function (error, results, fields) {
                if (error) res.send(error);
                else res.send(results);
        })
    )
});

function modify_maintenance(req, res, maintenance_id, cb){
    if(req.decoded.admin){
        cb();
    } else {
        connection.query("SELECT user_id FROM MAINTENANCE WHERE maintenance_id = ?", [maintenance_id],
        function (error, results, fields) {
            if (error) res.send(error);
            else if(results && results[0].user_id === req.decoded.user_id) cb();
            else res.status(401).send({"failed":"You do not have valid permissions"});
        });
    }
}

module.exports = router;
