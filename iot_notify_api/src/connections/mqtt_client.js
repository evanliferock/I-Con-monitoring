// Provides connection to local mosquitto message broker
var mqtt = require('mqtt');
var client = mqtt.connect({
  host: 'localhost',
  port: 1883,
  username: 'api',
  password: 'indiapaleale'
});

module.exports = client;
