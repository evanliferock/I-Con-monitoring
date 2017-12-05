var path = require('path'),
  winston = require('winston'),
  expressWinston = require('express-winston');

//Tracks the request and response bodies and meta details
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const detailsLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'Request_Details.log'),
      level: 'info'
    })
  ],
});

module.exports = detailsLogger;
