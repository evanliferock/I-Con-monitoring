var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'iCon1432',
	database: 'mosquitto'
});

module.exports = connection;
