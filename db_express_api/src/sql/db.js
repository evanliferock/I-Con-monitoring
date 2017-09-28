var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'iconmysql.ctowvjdljlrb.us-west-2.rds.amazonaws.com',
  user     : 'expressapi',
  password : 'icon_db',
  database : 'icon_db'
});

module.exports = connection;
