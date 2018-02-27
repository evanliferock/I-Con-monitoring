var sql = require('./connections/db');

var getSwitchColor = function(data) {
    if(data) {
        // check maintenance, send notification
        return '#1FE30E'; // green
    } else {
        //check maintenance, send notification
        return "#DE141E"; // red
    }
    //'#F5FC12' yellow
}

module.exports = getSwitchColor;