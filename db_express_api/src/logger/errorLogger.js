var path = require('path'),
winston = require('winston'),
expressWinston = require('express-winston');

// expressWinston.requestWhitelist.push('body');
// expressWinston.responseWhitelist.push('body');
const errorLogger = expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
      json: true,
      colorize: true
    }),
		new winston.transports.File({
			filename: path.join(__dirname, '..', '..', 'logs', 'Requests.log'),
			level: 'info'
		})
	],
});

module.exports = errorLogger;
