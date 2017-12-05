var mqtt = require('mqtt');
var client = mqtt.connect({
  host: 'localhost',
  port: 1883,
  username: 'send',
  password: 'itbro42'
});

module.exports = client;
