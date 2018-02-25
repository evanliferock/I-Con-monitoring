var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/', function (req, res) {
  if(req.body && req.body.password && req.body.username){
    var username = req.body.username;
    var password = req.body.password;
    connection.query('SELECT * FROM USER WHERE username = ?', [username], function (error, results, fields) {
      if (error) {
        res.status(500).send({ "failed": "error ocurred"});
      } else {
        if (results && results.length > 0 && !results[0].is_deleted) {
          comparePasswords(password, results, res);
        } else {
          res.status(401).send({
            "success": "username and password does not match"
          });
        }
      }
    });
  }else{
    res.status(401).send({
      "failed": "no username and password provided for login"
    });
  }
});

function comparePasswords(givenPassword, results, res){
  bcrypt.compare(givenPassword, results[0].password, function (err, doesMatch) {
    if (doesMatch) {
      sendTokens(res, results, "Login Successful");
    } else {
      res.status(401).send({
        "failed": "username and password does not match",
      });
    }
  });
}

router.post('/refresh', function(req, res){
  connection.query('SELECT * FROM USER WHERE user_id = ?', [req.decoded.user_id], function (error, results, fields) {
    if (error) {
      res.status(500).send({ "failed": "error ocurred"});
    } else {
      if (results && results.length > 0 && !results[0].is_deleted) {
        sendTokens(res, results, "Refresh Success");
      } else {
        res.status(401).send({
          "failed": "Appears user does not exist or has been deleted"
        });
      }
    }
  });
});


function sendTokens(res, results, message){
  var payload = {
    admin: Boolean(results[0].is_admin),
    user_id:results[0].user_id,
  };
  var access_token = jwt.sign(payload, "thisIsTheSecret", {
    expiresIn: '60m',
  });
  var refresh_token = jwt.sign(payload, "thisIsTheSecret", {
    expiresIn: '120m',
  });
  res.status(201).send({
    "success": message,
    "token": access_token,
    "refresh_token": refresh_token,
  });
}

module.exports = router;
