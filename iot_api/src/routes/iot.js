var express = require('express');
var router = express.Router();
var sql = require('../connections/sql');

router.get('/', function(req, res, next) {
    console.log('Call to GET in iot');
    /** 
    sql.query('SELECT * FROM [table] ORDER BY timestamp DESC LIMIT 1', function(error, results, fields) {
		if(error) {
			res.send(error);
		}
	});
    res.end(JSON.stringify(parsed_message));
    **/
});

module.exports = router;