var express = require('express');
var router = express.Router();
var connection = require('../sql/db');
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

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