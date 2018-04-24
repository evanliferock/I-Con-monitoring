# IoT API
## Current Endpoints
### Most Recent Data

#### GET /temp/1

Returns most recently updated temperature 1 value (F).

#### GET /temp/2

Returns most recently update temperature 2 value (F).

#### GET /door

Returns the most recent door count.

#### GET /switch

Returns the most recent switch state (on/off).

### Historical data

#### GET /lasthour/temp1

Returns the last hour of temperature 1 data (F). Used to calculate the last hour's average and max values.

#### GET /lasthour/temp2

Returns the last hour of temperature 2 data (F). Used to calculate the last hour's average and max values.

#### GET /lasthour/door

Returns the last hour of the door's 'open count.' Eventually can be used to determine number of people in the mine.

#### GET /lasthour/switch

Returns the last hour of switch state (on/off). Could be used to compare completed maintenance with machine states.

## Requirements

For development, you will only need Node.js installed on your environment.

## Installation and Running

Download the project using the following command

    $ git clone https://github.com/evanliferock/I-Con-monitoring.git

Once in the project's main folder, navigate to the IoT API folder using 
	`cd iot_api`

Then install all dependencies by typing 
        `npm install`

It will also be necessary to update your credentials under 
		`/iot_api/connections/sql.js` to properly connect to the database.

To run the API in a terminal window, just go to the `/iot_api` folder and type `$ npm start`.  We have the API running as a systemd service on our server to ensure it is always up and running, but for development it is probably best to just run it in a terminal.

## Updating Sources

Some packages usage might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands at once you can enter

    $ npm run pull

## Languages & Tools

### SQL

- [SQL](https://en.wikipedia.org/wiki/SQL) is used to manage the data held in our system. In this case it is used to store our sensor data in mqtts-server.js as well as check for maintenance notifications in checkSwitch.js.

### JavaScript

- [JavaScript](https://www.javascript.com/) is an object-oriented computer programming language commonly used to create interactive effects within web browsers.

### Express

- [Express.js](https://expressjs.com/) is a framework developed for Node.js that allows developers to easily create API's, among other things. 