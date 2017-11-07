var awsIoT = require('aws-iot-device-sdk');

var shadow = awsIoT.thingShadow( {
	keyPath: './routes/connections/device_certs/cloud_receiver.private.key',
	certPath: './routes/connections/device_certs/cloud_receiver.cert.pem',
	caPath: './routes/connections/device_certs/root-CA.crt',
	clientId: 'arn:aws:iot:us-west-2:457696877060:thing/cloud_receiver',
	host: 'a9kph26qakxd4.iot.us-west-2.amazonaws.com'
});

module.exports = shadow;
