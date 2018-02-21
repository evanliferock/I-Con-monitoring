var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../sql/db');;

// GET USER BASEDN ON ID
router.get('/:user_id', function (req, res) {
    var params = req.params;
    connection.query('SELECT * FROM USER WHERE user_id = ?', [params.user_id], function (error, results, fields) {
        if (error) res.send(error);
        else res.send(results);
    });
});


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



module.exports = router;
