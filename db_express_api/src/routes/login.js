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
    res.status(400).send({
      "failed": "no username and password provided for login"
    });
  }
});

function comparePasswords(givenPassword, results, res){
  bcrypt.compare(givenPassword, results[0].password, function (err, doesMatch) {
    if (doesMatch) {
      var payload = {
        admin: Boolean(results[0].is_admin),
        user_id:results[0].user_id,
      };
      var token = jwt.sign(payload, "thisIsTheSecret", {
        expiresIn: '60m',// expires in 1 hr
      });
      res.status(201).send({
        "success": "login sucessfull",
        "token": token
      });
    } else {
      res.status(401).send({
        "success": "username and password does not match",
      });
    }
  });
}

module.exports = router;
