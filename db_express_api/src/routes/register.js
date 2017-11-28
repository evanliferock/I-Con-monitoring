var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt     = require('bcrypt');


router.post('/', function(req,res){
  console.log("Call to POST /register");
  // console.log("req",req.body);
  bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {

      req.body.password = bcryptedPassword;

      connection.query('INSERT INTO USER SET ?', req.body, function (error, results, fields) {
          console.log(req.body.first_name);
          if (error) {
            console.log("error ocurred",error);
            res.status(500).send({
              "failed":"error ocurred"
            });
          }else{
            console.log('The solution is: ', results);
            res.send({
              "success":"user registered sucessfully"
            });
          }
      });
  });
});

module.exports = router;
