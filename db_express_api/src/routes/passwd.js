var express = require('express');
var router = express.Router();
var connection = require('../sql/db');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

router.put('/', function (req, res) {
    var params = req.body;
    if(params && params.password){
        var user_id = params.user_id;
        var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(params.password, salt, function (err, bcryptedPassword) {
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
