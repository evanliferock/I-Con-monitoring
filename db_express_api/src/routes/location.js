var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');;

// GET ALL EQUIPMENT
router.get('/', function (req, res) {
    connection.query('SELECT * FROM LOCATION', function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});


module.exports = router;
