# Current API

## Maintenance
### GET /maintenance
Returns upcoming maintenance
### GET /maintenance/times
Returns only the date and time of upcoming maintenance
### GET /maintenance/[user_id]
Returns the upcoming maintenance specific that is planned to be performed by the user
### POST /maintenance
Add a maintenance. Will always set is_complete and is_canceled to false Example body: {"user_id":"1","start_date":"2017-12-30","start_time":"14:44:00","equipment_id":1,"location_id":1}
### PUT /maintenance/complete/[maintenance_id]
Complete a maintenance
### PUT /maintenance/cancel/[maintenance_id]
Cancel a maintenance

## Users
### POST /register
Register a user with first_name, last_name, username, password
### /login
Validate a login with username and password
