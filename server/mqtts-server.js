/**
 * systemd funcitonality: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/
 * to view logs: journalctl -u mqtts-server 
 */
var mosca = require('mosca');
var path = require('path');
var sql = require('./connections/sql');

/** TODO:
 * - Add SQL stuff
 */

var PORT = 8883;
var CA = path.join(__dirname, '/tls/ca.crt');
var SECURE_CERT = path.join(__dirname, '/tls/server.crt');
var SECURE_KEY = path.join(__dirname, '/tls/server.key');

// Server settings
var settings = {
    port: PORT,
    secure: {
        keyPath: SECURE_KEY,
        certPath: SECURE_CERT,
        caPath: CA,
        requestCert: true,
        rejectUnauthorized: true
    }
}

// Simple function to generate a clean timestamp for logged messages
function currentTime() {
    var date = new Date();
    return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}

/********************************************************************/
// Authentication functions
// Modified versions from https://github.com/mcollina/mosca/wiki/Authentication-&-Authorization
//
// Accepts the connection if the username and password is valid and if the connection is encrypted
var authenticate = function(client, username, password, callback) {
    var authorized = (username === 'gateway' && password.toString() === 'secret' && client.connection.stream.encrypted == true);
    if (authorized) {
        client.user = username;
    }
    else {
        console.log(currentTime(), ' Authentication attempt made with bad credentials -- Username: ', username, ' Password: ', password.toString());
    }
    callback(null, authorized);
}
  
// Modified to only let our gateway publish to a single topic, also verifies that the connection is still encrypted
var authorizePublish = function(client, topic, payload, callback) {
    if(topic == '/users/gateway' && client.connection.stream.encrypted == true) {
        callback(null, true);
    }
    else {
        console.log(currentTime(), ' Unauthorized publish attempted -- ID: ', client.id, ' User: ', client.user, ' Topic: ', topic);
        callback(null, false);
    }
}
  
// Modified so that no client can subscribe to any topic because our 
//    gateway has no need to subscribe to any topic
var authorizeSubscribe = function(client, topic, callback) {
    console.log(currentTime(), ' Unauthorized subscribe attempted -- ID: ', client.id, ' User: ', client.user, ' Topic: ', topic);
    callback(null, false);
}

// Called when server is created. Sets server authentication/authorization functions and logs message when done
function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    console.log(currentTime(), ' MQTTS server started on port ', PORT);
};

/*******************************************************************************/

// Create server
var server = new mosca.Server(settings);

// Server functions
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log(currentTime(), ' Client Connected -- ID: ', client.id, ' User: ', client.user); 
});

server.on('clientDisconnected', function(client) {
    console.log(currentTime(), ' Client Disconnected -- ID: ', client.id, ' User: ', client.user);
});

server.on('published', function(packet, client) {
    if((packet.topic.split('/')[2].toString() != "new") && (packet.topic.split('/')[2].toString() != "disconnect")) { // Avoid reduntant messages
        console.log(currentTime(), ' User/ID: ', client.user, '/', client.id, ' Published: ', packet.payload.toString(), ' On: ', packet.topic);
        /** 
        sql.query('INSERT INTO [table] SET ?', [JSON stuff], function(error, results, fields) {
            if(error) throw error;
            else console.log('Message inserted into DB');
        }); */
    }
});
