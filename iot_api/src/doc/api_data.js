define({ "api": [
  {
    "type": "get",
    "url": "/iot/door",
    "title": "Get most recent door count",
    "version": "1.0.0",
    "name": "CurrentDoor",
    "group": "Door",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the most recent data in our database from the door sensor</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Most recent door count</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be door in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page. Always green for doors</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Door"
  },
  {
    "type": "get",
    "url": "/iot/lasthour/door",
    "title": "Get last hour of door data",
    "version": "1.0.0",
    "name": "LastHourDoor",
    "group": "Door",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the last hour of data from the door sensor. Used for visualizing historical data on the main page</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Door count at the timestamp in the same object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be door in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page at the timestamp. Should always be green for doors</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Door"
  },
  {
    "type": "get",
    "url": "/iot/lasthour/switch",
    "title": "Get last hour of switch data",
    "version": "1.0.0",
    "name": "LastHourSwitch",
    "group": "Switch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the last hour of data from the switch sensor. Used for visualizing historical data on the main page</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Used for temperatures and door, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be switch in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Switch state at the timestamp in the same object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page at the timestamp. Determined by checkSwitch.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Switch"
  },
  {
    "type": "get",
    "url": "/iot/switch",
    "title": "Get most recent switch state",
    "version": "1.0.0",
    "name": "RecentSwitch",
    "group": "Switch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the most recent data in our database from the switch sensor</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Used for temperatures and doors, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be switch in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Most recent switch state (0 - closed, 1 - open)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page. Determined by checkSwitch.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Switch"
  },
  {
    "type": "get",
    "url": "/iot/lasthour/temp1",
    "title": "Get last hour of temp1 data",
    "version": "1.0.0",
    "name": "LastHourTemp1",
    "group": "Temperature",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the last hour of data from the temp1 sensor. Used for visualizing historical data on the main page</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Temp1 value in F at the timestamp in the same object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be temp1 in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page at the timestamp. Determined by checkTemperature.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Temperature"
  },
  {
    "type": "get",
    "url": "/iot/lasthour/temp2",
    "title": "Get last hour of temp2 data",
    "version": "1.0.0",
    "name": "LastHourTemp2",
    "group": "Temperature",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the last hour of data from the temp2 sensor. Used for visualizing historical data on the main page</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Temp2 value in F at the timestamp in the same object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be temp2 in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page at the timestamp. Determined by checkTemperature.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Temperature"
  },
  {
    "type": "get",
    "url": "/iot/temp/1",
    "title": "Get most recent temp1 data",
    "version": "1.0.0",
    "name": "RecentTemp1",
    "group": "Temperature",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the most recent data in our database from the temp1 sensor</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Most recent temp1 value in F</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be temp1 in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page. Determined by checkTemperature.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Temperature"
  },
  {
    "type": "get",
    "url": "/iot/temp/2",
    "title": "Get most recent temp2 data",
    "version": "1.0.0",
    "name": "RecentTemp2",
    "group": "Temperature",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches the most recent data in our database from the temp2 sensor</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique number for the entry in the database</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>Most recent temp2 value in F</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensor",
            "description": "<p>Which sensor added the data to the database (should always be temp2 in this case)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "open",
            "description": "<p>Used for switches, should always be NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Proper sensor color for main page. Determined by checkTemperature.js</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time of sensor update</p>"
          }
        ]
      }
    },
    "filename": "routes/iot.js",
    "groupTitle": "Temperature"
  }
] });
