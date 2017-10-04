// https://www.restapiexample.com/rest-api-tutorial/create-rest-api-using-node-js-mysql-express/
// base extension is /maintenance
var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');

// GET ALL UPCOMING MAINTENANCE
router.get('/', function (req, res) {
   connection.query('SELECT * FROM MAINTENANCE WHERE start_date >= DATE(NOW()) AND start_time >= TIME(NOW())', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// get upcoming dates and times
router.get('/time', function (req, res) {
   connection.query('SELECT start_date, start_time FROM MAINTENANCE WHERE start_date >= DATE(NOW()) AND start_time >= TIME(NOW())', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


// GET ALL UPCOMING MAINTENANCe
router.get('/:user_id', function (req, res) {
    var params = req.params;
    connection.query('SELECT * FROM MAINTENANCE WHERE start_date >= DATE(NOW()) AND start_time >= TIME(NOW()) AND user_id =' + params.user_id,
        function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
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

// MAKE it so that
router.post('/', function (req, res) {
   var params = req.body;
   // TODO: verify that the date is in the future
   connection.query('INSERT INTO MAINTENANCE SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// SET AS COMPLETE
router.put('/complete/:id', function (req, res) {
    var params = req.params;
    connection.query('UPDATE MAINTENANCE SET is_complete = 1 WHERE maintenance_id = ' + params.id, function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// SET AS CANCELED
router.put('/cancel/:id', function (req, res) {
    var params = req.params;
    connection.query('UPDATE MAINTENANCE SET is_canceled = 1 WHERE maintenance_id = ' + params.id, function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

module.exports = router;
