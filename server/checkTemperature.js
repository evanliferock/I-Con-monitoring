var sql = require('./connections/sql');

var getTempColor = function(data) {
    if(data < 68) {
        return '#1FE30E'; // green
    } else {
        // notification?
        return "#DE141E"; // red
    }
}

module.exports = getTempColor;