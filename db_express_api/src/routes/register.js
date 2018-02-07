var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt = require('bcryptjs');

router.post('/', function (req, res) {
  if(req.body && req.body.password && req.body.username && req.decoded.admin){
    connection.query('SELECT * FROM USER WHERE username = ?', [req.body.username], function (error, results, fields) {
      if (error) {
        res.status(500).send({ "failed": "error ocurred"});
      } else {
        if (results && results.length > 0) {
          res.status(400).send({"failed": "username already exists"});
        } 
      }
    });
    var salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req.body.password, salt, function (err, bcryptedPassword) {
      req.body.password = bcryptedPassword;
      connection.query('INSERT INTO USER SET ?', req.body, function (error, results, fields) {
        if (error) {
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
  }else{
    res.status(400).send({
      "failed": "no username and password provided for login"
    });
  }
});

module.exports = router;
