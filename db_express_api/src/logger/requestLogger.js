var path = require('path'),
  winston = require('winston'),
  expressWinston = require('express-winston');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'Requests.log'),
      level: 'info'
    })
  ],
});

module.exports = requestLogger;
