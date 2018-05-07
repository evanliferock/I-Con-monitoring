var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');;

/**
 * @api {get} /location
 * @apiVersion 1.0.0
 * @apiName AllLocation
 * @apiGroup Location
 * @apiPermission none
 * 
 * @apiDescription Selects all fields for all locations/sites stored in the table. 
 */
router.get('/', function (req, res) {
    connection.query('SELECT * FROM LOCATION', function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});


module.exports = router;
