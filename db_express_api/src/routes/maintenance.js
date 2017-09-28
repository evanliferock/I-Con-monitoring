// https://www.restapiexample.com/rest-api-tutorial/create-rest-api-using-node-js-mysql-express/
// base extension is /maintenance
var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');

// GET ALL MAINTENANCE
router.get('/', function (req, res) {
   connection.query('SELECT * FROM MAINTENANCE', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

/*
// GET A MAINTENANCE
app.get('/maintenance/:id', function (req, res) {
   connection.query('SELECT * FROM MAINTENANCE WHERE maintenance_id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// MAKE it so that
app.post('/maintenance', function (req, res) {
   var params = req.body;
   console.log(params);
   connection.query('INSERT INTO MAINTENANCE SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// SET AS COMPLETE
app.put('/maintenance/complete/:id'. function (req, res) {

});

// SET AS CANCELED
app.put('/maintenance/cancel/:id'. function (req, res) {

});

*/

module.exports = router;
