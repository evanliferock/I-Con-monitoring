var mail = require('./connections/mail');

var lastNotificationTime = 0; // Initialize to 0. Keeps track of last notification time to reduce reduntant notifications

// Function to send alert for sensor (name of sensor) at temp (temperature of sensor)
function sendMailAlert(sensor, temp) {
    let mailOptions = {
        from: '"iCon Notify System" <icon.notifications@gmail.com>',
        to: 'user@example.com',
        subject: sensor + ' Alert!',
        text: sensor + ' are at dangerous levels(' + temp + ')!'
    }
    mail.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error in sending email alert');
            return console.log(error);
        }
        console.log('Email alert sent for ' + sensor + ' at ' + temp + ' degrees');
    });
}

var getTempColor = function(data) {
    if(data < 68) {
        return '#1FE30E'; // green
    } else {
        if(Date.now() - lastNotificationTime > (1000 * 60 * 5)) { // Check time of last notification. If more than 5 min. ago, send notification
            lastNotificationTime = Date.now();
            sendMailAlert('Temperatures', data);
        }
        return '#DE141E'; // red
    } 
}

module.exports = getTempColor;