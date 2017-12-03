var winston = require('winston'),
    expressWinston = require('express-winston');

const consoleLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
    ],
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    meta: false,
    colorize: true,
});

module.exports = consoleLogger;
