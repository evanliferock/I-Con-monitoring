var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');
var bcrypt     = require('bcrypt');
var jwt    = require('jsonwebtoken');


router.post('/', function(req,res) {
    console.log("Call to POST /login");
    var username= req.body.username;
    var password = req.body.password;
    // connection.query('SELECT * FROM USER WHERE username = ?',[username], function (error, results, fields) {
    //     if (error) {
    //       // console.log("error ocurred",error);
    //       res.send({
    //         "code":400,
    //         "failed":"error ocurred"
    //       })
    //     }else{
    //       // console.log('The solution is: ', results);
    //       if(results.length >0){
    //         bcrypt.compare(password, results[0].password, function(err, doesMatch){
    //           if (doesMatch){
    //             const payload = {
    //               admin: true
    //             };
    //             var token = jwt.sign(payload, "thisIsTheSecret", {
    //               expiresIn: '60m'// expires in 1 hr
    //             });
    //             res.send({
    //                "code":200,
    //                "success":"login sucessfull",
    //                "token":token
    //            });
    //       }else{
    //         res.send({
    //          "code":204,
    //          "success":"username and password does not match",
    //          "password":password,
    //          "password2":results[0].password
    //            });
    //          }
    //         });
    //       } else {
    //         res.send({
    //           "code":204,
    //           "success":"username does not exist"
    //             });
    //       }
    //     }
    // });
    const payload = {
                  admin: true
                };
                var token = jwt.sign(payload, "thisIsTheSecret", {
                  expiresIn: '1m'// expires in 1 hr
                });
                res.send({
                   "code":200,
                   "success":"login sucessfull",
                   "token":token
               });
});

module.exports = router;
