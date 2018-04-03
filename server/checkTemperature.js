var mail = require('./connections/mail');

var lastNotificationTime = 0; // Initialize to 0

// Function to send alert for sensor at temperature temp and urgency level
function sendMailAlert(sensor, temp, level) {
    let mailOptions = {
        from: '"iCon Notify System" <icon.notifications@gmail.com>',
        to: 'user@example.com',
        subject: sensor + ' Alert!',
        text: sensor + ' are at ' + level + ' levels(' + temp + ')!'
    }
    mail.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error in sending email alert');
            return console.log(error);
        }
        console.log('Email alert sent for ' + sensor);
    });
}

var getTempColor = function(data) {
    if(data < 68) {
        return '#1FE30E'; // green
    } else {
        if(Date.now() - lastNotificationTime > (1000 * 60 * 5)) { // Check time of last notification
            lastNotificationTime = Date.now();
            sendMailAlert('Temperatures', data, 'dangerous');
        }
        return "#DE141E"; // red
    } 
}

module.exports = getTempColor;