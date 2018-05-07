define({ "api": [
  {
    "type": "get",
    "url": "/equipment",
    "title": "Get all equipment",
    "version": "1.0.0",
    "name": "AllEquipment",
    "group": "Equipment",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Gets all fields for all equipment at the site (in the table).</p>",
    "filename": "routes/equipment.js",
    "groupTitle": "Equipment"
  },
  {
    "type": "get",
    "url": "/location",
    "title": "",
    "version": "1.0.0",
    "name": "AllLocation",
    "group": "Location",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Selects all fields for all locations/sites stored in the table.</p>",
    "filename": "routes/location.js",
    "groupTitle": "Location"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login attempts",
    "version": "1.0.0",
    "name": "Login",
    "group": "Login",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Used for all login attempts. Compares the user name and password to the proper table in the database. If proper credentials are provided, a JWT is provided to the user.</p>",
    "filename": "routes/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/login/refresh",
    "title": "Keep session alive",
    "version": "1.0.0",
    "name": "LoginRefresh",
    "group": "Login",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Refreshes a users JWT to avoid their session expiring.</p>",
    "filename": "routes/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "get",
    "url": "/maintenance",
    "title": "Get all maintenance",
    "version": "1.0.0",
    "name": "AllMaintenance",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches all information about all upcoming maintenance in the database</p>",
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "get",
    "url": "/maintenance/time",
    "title": "Get all maintenance times",
    "version": "1.0.0",
    "name": "AllMaintenanceTime",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches all start date and times for all upcoming maintenance in the database</p>",
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "get",
    "url": "/maintenance/:user_id",
    "title": "Get user's maintenance",
    "version": "1.0.0",
    "name": "AllUserMaintenance",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches all upcoming maintenance for (planned by) a specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>A user's unique ID number</p>"
          }
        ]
      }
    },
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "put",
    "url": "/maintenance/cancel/:id",
    "title": "Cancel maintenance",
    "version": "1.0.0",
    "name": "CancelMaintenance",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Marks a specified maintenance as canceled</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID number of a maintenance</p>"
          }
        ]
      }
    },
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "put",
    "url": "/maintenance/complete/:id",
    "title": "Complete maintenance",
    "version": "1.0.0",
    "name": "CompleteMaintenance",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Marks a specified maintenance as completed</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID number of a maintenance</p>"
          }
        ]
      }
    },
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "post",
    "url": "/maintenance",
    "title": "Plan Maintenance",
    "version": "1.0.0",
    "name": "PlanMaintenance",
    "group": "Maintenance",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Adds the requested maintenance to the database. If there are any errors in the formatting or planning, appropriate errors are thrown</p>",
    "filename": "routes/maintenance.js",
    "groupTitle": "Maintenance"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register users",
    "version": "1.0.0",
    "name": "Register",
    "group": "Register",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Used to register new users. Check is the user already exists, if not, encrypts their password and stores all info in the proper table.</p>",
    "filename": "routes/register.js",
    "groupTitle": "Register"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get all users",
    "version": "1.0.0",
    "name": "AllUsers",
    "group": "User",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Fetches all user's and their information from the table</p>",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/:user_id/:newEmail",
    "title": "Update email",
    "version": "1.0.0",
    "name": "ChangeEmail",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Updates a specific user's email in the table</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Unique ID number of user with email to change</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newEmail",
            "description": "<p>Desired new email address for user</p>"
          }
        ]
      }
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:user_id",
    "title": "Get user",
    "version": "1.0.0",
    "name": "GetUserByID",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Fetches a given user based on the provided ID</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Unique ID number of desired user</p>"
          }
        ]
      }
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/remove",
    "title": "Remove user",
    "version": "1.0.0",
    "name": "Remove",
    "group": "User",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "description": "<p>Marks a specified user in the table by updateing their is_deleted field to 1.</p>",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/password/reset",
    "title": "Reset password",
    "version": "1.0.0",
    "name": "ResetPassword",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Resets/updates a user's password</p>",
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });
