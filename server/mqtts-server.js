var mosca = require('mosca');
var path = require('path');
var sql = require('./connections/sql'); // Conects us to MySQL DB where sensor data is stored in SENSOR_DATA table
// Modules to determine sensor color and send notifications
var checkSwitch = require('./checkSwitch');
var checkTemperature = require('./checkTemperature');

var PORT = 8883; // Desired port to run the server. 8883 is MQTTS standard, but any available port will work
var CA = path.join(__dirname, '/tls/ca.crt'); // Certificate authority to sign and verify all certs and keys. Needed for MQTTS
var SECURE_CERT = path.join(__dirname, '/tls/server.crt'); // Server certificate. Used to sign all incoming messages. Needed for MQTTS
var SECURE_KEY = path.join(__dirname, '/tls/server.key');  // Server private key. Used to decrypt all incoming messages. Needed for MQTTS

// Server settings. Collect port, MQTTS settings, and other configurations into one variable
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
// Returns a current timestamp in the format DD-MM-YYYY@HH:MM:SS
function currentTime() {
    var date = new Date();
    return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}

/********************************************************************/
// Authentication function
// Modified versions from https://github.com/mcollina/mosca/wiki/Authentication-&-Authorization
//
// Accepts the connection if the username and password is valid. If not, logs the attempt
var authenticate = function(client, username, password, callback) {
    var authorized = (username === 'gateway' && password.toString() === 'secret');
    if (authorized) {
        client.user = username;
    }
    else {
        console.log(currentTime(), ' Authentication attempt made with bad credentials -- Username: ', username, ' Password: ', password.toString());
    }
    callback(null, authorized);
}

// Called when server is created. Sets server authentication/authorization functions and logs message when server is running
function setup() {
    server.authenticate = authenticate;
    console.log(currentTime(), ' MQTTS server started on port ', PORT);
};

/*******************************************************************************/

// Create and start the server using configurations set in settings variable
var server = new mosca.Server(settings);

// Server functions
// When server is started, run function called setup
server.on('ready', setup);

// Every time a client connects to server (must be authenticated), log with timestamp
server.on('clientConnected', function(client) {
    console.log(currentTime(), ' Client Connected -- ID: ', client.id, ' User: ', client.user); 
});

// Every time a client disconnects from server, log with timestamp
server.on('clientDisconnected', function(client) {
    console.log(currentTime(), ' Client Disconnected -- ID: ', client.id, ' User: ', client.user);
});

var door_count = 0; // keep track of door count. Initializes to 0, so every time server restarts the count is reset

// Everytime messages are published through the server. Sometimes sensor data, sometimes new client messages
server.on('published', function(packet, client) {
    // Temperature 1 sensor
    if(packet.topic == 'temp/1') {
        var temp1 = JSON.parse(packet.payload);
        var temp1c = checkTemperature(temp1);
        var post = {sensor: 'temp1', temp: temp1, color: temp1c};
        sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(error, results, fields) {
            if(error) throw error;
        });
        console.log(currentTime(), ' User/ID: ', client.user, '/', client.id, ' Published: ', temp1, 'F on ', packet.topic);
    }
    // Temperature 2 sensor
    if(packet.topic == 'temp/2') {
        var temp2 = JSON.parse(packet.payload);
        var temp2c = checkTemperature(temp2);
        var post = {sensor: 'temp2', temp: temp2, color: temp2c};
        sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(error, results, fields) {
            if(error) throw error;
        });
        console.log(currentTime(), ' User/ID: ', client.user, '/', client.id, ' Published: ', temp2, 'F on ', packet.topic);
    }    
    // Door sensor
    if(packet.topic == 'door') {
        var door = JSON.parse(packet.payload);
        if(door == false) {
            if(door == false) {
                door_count += 1;
             
                var post = {sensor: 'door', temp: door_count, color: '#1FE30E'};           
                sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(error, results, fields) {
                    if(error) throw error;
                });
                console.log(currentTime(), ' User/ID: ', client.user, '/', client.id, ' Published: ', door_count, ' on ', packet.topic);
            }
        }
    }
    // Switch sensor, used for switches 1-4
    if(packet.topic == 'switch') {
        if(JSON.parse(packet.payload) == true || JSON.parse(packet.payload) == false) {
            var switches = JSON.parse(packet.payload);
            //parse and add to sql
            var switchColor = checkSwitch(switches);
            var post = {sensor: 'switch', open: Number(switches), color: switchColor};
            sql.query('INSERT INTO SENSOR_DATA SET ?', post, function(error, results, fields) {
                if(error) throw error;
            });
            console.log(currentTime(), ' User/ID: ', client.user, '/', client.id, ' Published: ', switches, ' on ', packet.topic);
        }
    }
});
