var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');;
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

/**
 * @api {get} /user/:user_id Get user
 * @apiVersion 1.0.0
 * @apiName GetUserByID
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiDescription Fetches a given user based on the provided ID
 * 
 * @apiParam {Number} user_id Unique ID number of desired user
 * 
 */
router.get('/:user_id', function (req, res) {
    var params = req.params;
    connection.query('SELECT * FROM USER WHERE user_id = ?', [params.user_id], function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});

/**
 * @api {put} /user/:user_id/:newEmail Update email 
 * @apiVersion 1.0.0
 * @apiName ChangeEmail
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiDescription Updates a specific user's email in the table
 * 
 * @apiParam {Number} user_id Unique ID number of user with email to change
 * @apiParam {String} newEmail Desired new email address for user
 */
router.put('/:user_id/:newEmail', function (req,res) {
  var params = req.params;
  connection.query('UPDATE USER SET email = ? WHERE user_id = ?', [params.newEmail, params.user_id],
  function (error, results, fields) {
      if (error) {
          res.status(500).send({
              "failed": "error ocurred on call to change email"
          });
      } else {
          res.send({
              "success": "user email reset sucessfully"
          });
      }
  });
}
)

/**
 * @api {get} /user Get all users
 * @apiVersion 1.0.0
 * @apiName AllUsers
 * @apiGroup User
 * @apiPermission Admin
 * 
 * @apiDescription Fetches all user's and their information from the table
 */
router.get('/', function (req, res) {
    if(req.decoded.admin){
        connection.query("SELECT user_id, username, email, first_name, last_name FROM USER WHERE is_deleted = 0;",
        function(error, results, fields){
            if (error) {
                res.status(500).send({
                    "failed": "error ocurred when getting users"
                });
            } else {
                res.send(results);
            }
        });
    } else {
        res.status(400).send({
            "failed": "You do not meet the proper permissions"
        });
    }
});

/**
 * @api {put} /user/remove Remove user
 * @apiVersion 1.0.0
 * @apiName Remove
 * @apiGroup User
 * @apiPermission Admin
 * 
 * @apiDescription Marks a specified user in the table by updateing their is_deleted field to 1.
 */
router.put('/remove', function (req, res) {
    if(req.body && req.body.user_id && req.decoded.admin){
        connection.query("UPDATE USER SET is_deleted = 1 WHERE user_id = ?", [req.body.user_id],
        function(error, results, fields) {
            if (error) {
                res.status(500).send({
                    "failed": "error ocurred when marking user as deleted"
                });
            } else {
                res.send({
                    "success": "user successfully marked as deleted"
                });
            }
        });
    } else {
        res.status(400).send({
            "failed": "You do not meet the proper permissions and/or you did not send a user_id"
        });
    }
});

/**
 * @api {put} /user/password/reset Reset password
 * @apiVersion 1.0.0
 * @apiName ResetPassword
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiDescription Resets/updates a user's password
 */
router.put('/password/reset', function (req, res) {
    if(req.body && req.body.password){
        var user_id;
        if(req.decoded.admin && req.body.user_id){
            user_id = req.body.user_id;
        } else {
            user_id = req.decoded.user_id;
        }
        var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, salt, function (err, bcryptedPassword) {
            connection.query('UPDATE USER SET password = ? WHERE user_id = ?', [bcryptedPassword, user_id],
            function (error, results, fields) {
                if (error) {
                    res.status(500).send({
                        "failed": "error ocurred on call to reset password"
                    });
                } else {
                    res.send({
                        "success": "user password reset sucessfully"
                    });
                }
            });
        });
    } else {
        res.status(400).send({
            "failed": "no new password sent"
        });
    }
});

module.exports = router;
