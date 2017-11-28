var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var logger = require('../logger/logger');


router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  logger.info('POST /login attempt for username: ' + username);
  connection.query('SELECT * FROM USER WHERE username = ?', [username], function (error, results, fields) {
    if (error) {
      logger.error("There was an error in POST /login for username: " + username)
      res.status(500).send({ "failed": "error ocurred"});
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function (err, doesMatch) {
          if (doesMatch) {
            const payload = {
              admin: true
            };
            var token = jwt.sign(payload, "thisIsTheSecret", {
              expiresIn: '60m'// expires in 1 hr
            });
            res.status(201).send({
              "success": "login sucessfull",
              "token": token
            });
          } else {
            res.status(401).send({
              "success": "username and password does not match",
              "password": password,
              "password2": results[0].password
            });
          }
        });
      } else {
        res.status(401).send({
          "success": "username and password does not match"
        });
      }
    }
  });
});

module.exports = router;
