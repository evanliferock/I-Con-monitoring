var sql = require('./connections/db');
var sendAlert = require('./connections/notifications');
var maintenanceLength = 3600*1000;

var getSwitchColor = function(data) {
    if(data) {
        sql.query('SELECT start_date_time, is_complete FROM MAINTENANCE WHERE equipment_id = 2', function (error, results, fields) {
            if (error) console.log(error);
            else {
              var currentTime = Date.now();
              for (let i = 0; i < results.length; i++) {
                if (currentTime < results[i].start_date_time &&  results[i].start_date_time < (currentTime + maintenanceLength)){
                  sendAlert("on", "WARNING: Switch is on while maintenance is ongoing!")
                }
              }
            }
        });
        return '#1FE30E'; // green
    } else {
        sql.query('SELECT start_date_time, is_complete FROM MAINTENANCE WHERE equipment_id = 2', function (error, results, fields) {
            if (error) console.log(error);
            else {
              var currentTime = Date.now();
              var isMaintenance = false;
              for (let i = 0; i < results.length; i++) {
                if (currentTime < results[i].start_date_time &&  results[i].start_date_time < (currentTime + maintenanceLength)){
                  isMaintenance = true;
                }
              }

              if (!isMaintenance){
                sendAlert("off", "WARNING Switch is off when no maintenance is scheduled!")
              }
            }
    });
    return "#DE141E"; // red

}
}

module.exports = getSwitchColor;
