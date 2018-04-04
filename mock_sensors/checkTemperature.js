var sql = require('./connections/db');

var getTempColor = function(data) {
    if(data < 60) {
        return '#1FE30E'; // green
    } else if(data < 68) {
        return "#F5FC12" // yellow
    } else {
        // notification?
        return "#DE141E"; // red
    }
}

module.exports = getTempColor;
