var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt = require('bcrypt');
var logger = require('../logger/logger');

router.post('/', function (req, res) {
  bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {
    req.body.password = bcryptedPassword;
    connection.query('INSERT INTO USER SET ?', req.body, function (error, results, fields) {
      if (error) {
        logger.error('An error occurred while registering username: ' + req.body.username);
        res.status(500).send({
          "failed": "error ocurred"
        });
      } else {
        res.send({
          "success": "user registered sucessfully"
        });
      }
    });
  });
});

module.exports = router;
