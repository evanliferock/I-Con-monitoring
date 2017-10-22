var mysql      = require('mysql');
var bcrypt     = require('bcrypt');
var connection = require('../sql/db');
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
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
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
});
}



exports.login = function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM USERS WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      bcrypt.compare(password, results[0].password, function(err, doesMatch){
        if (doesMatch){
     res.send({
       "code":200,
       "success":"login sucessfull"
         });
      }else{
     res.send({
       "code":204,
       "success":"username and password does not match",
       "password":password,
       "password2":results[0].password
         });
       }
      });
      }
      else{
      res.send({
        "code":204,
        "success":"username does not exist"
          });
    }
  }
  });
}
