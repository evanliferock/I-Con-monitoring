# Current API
### GET /maintenance
Returns upcoming maintenance
### GET /maintenance/times
Returns only the date and time of upcoming maintenance
### GET /maintenance/[user_id]
Returns the upcoming maintenance specific that is planned to be performed by the user
### POST /maintenance
Add a maintenance
### PUT /maintenance/complete/[maintenance_id]
Complete a maintenance
### PUT /maintenance/cancel/[maintenance_id]
Cancel a maintenance
