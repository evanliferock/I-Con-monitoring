var awsIoT = require('aws-iot-device-sdk');

var name = 'arn:aws:iot:us-west-2:457696877060:thing/iotest';

var shadow = awsIoT.thingShadow({
	keyPath: './thing_certs/iotest.private.key',
	certPath: './thing_certs/iotest.cert.pem',
	caPath: './thing_certs/root-CA.crt',
	clientId: name,
	host: 'a9kph26qakxd4.iot.us-west-2.amazonaws.com'
});

module.exports = shadow;
