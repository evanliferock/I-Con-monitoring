var path = require('path'),
	winston = require('winston'),
	expressWinston = require('express-winston');

//Tracks the request and response bodies and meta details in errors
const errorLogger = expressWinston.errorLogger({
	transports: [
		new winston.transports.File({
			filename: path.join(__dirname, '..', '..', 'logs', 'Requests.log'),
			level: 'info'
		})
	],
});

module.exports = errorLogger;
