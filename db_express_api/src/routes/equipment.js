var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');;

/**
 * @api {get} /equipment Get all equipment
 * @apiVersion 1.0.0
 * @apiName AllEquipment
 * @apiGroup Equipment
 * @apiPermission none
 * 
 * @apiDescription Gets all fields for all equipment at the site (in the table).
 */
router.get('/', function (req, res) {
    connection.query('SELECT * FROM EQUIPMENT', function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});


module.exports = router;
