// const { createLogger, format, transports } = require('winston');
var path = require('path');
// const { combine, timestamp, simple } = format;
// var winston = require('winston');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: path.join(__dirname, '..', '..', 'logs', 'details.log'),
      level: 'debug'
    })
  ]
});

module.exports = logger;
