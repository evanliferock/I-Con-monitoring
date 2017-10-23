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

       var users={
         "first_name":req.body.first_name,
         "last_name":req.body.last_name,
         "username":req.body.username,
         "password":bcryptedPassword,
       }
      connection.query('INSERT INTO USERS SET ?',users, function (error, results, fields) {
          console.log(users.first_name);
          if (error) {
            console.log("error ocurred",error);
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }else{
            console.log('The solution is: ', results);
            res.send({
              "code":200,
              "success":"user registered sucessfully"
            });
          }
      });
  });
});

module.exports = router;
