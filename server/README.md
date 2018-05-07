# MQTTS Server

## Requirements

For development, you will only need Node.js installed on your environment.

### Node
[Node](http://nodejs.org/) is very easy to install & includes [NPM](https://npmjs.org/).
Run the following commands in command prompt/terminal after the installation procedure to make sure it installed correctly. It should display your version.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21
    
#### Node installation on Windows

Just go on the [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

#### Node installation on OS X

You will need to use Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already.

When Homebrew is correctly installed, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

---

## Installation and Running

Download the project using the following command

    $ git clone https://github.com/evanliferock/I-Con-monitoring.git

Once in the project's main folder, navigate to the server folder using 
	`cd server`

Then install all dependencies by typing 
        `npm install`

It will also be necessary to update your credentials under 
		`/server/connections/sql.js` to properly connect to the database, and
		`/server/connections/mail.js` to properly connect to the e-mail service used for notifications 

To run the server in a terminal window, just go to the `/server` folder and type `$ node mqtts-server.js`. While the server works in a simple terminal window, we recommend running the server as a systemd service so that it will always run. For development though, running in a terminal window is probably best.

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

### Mosca

- [Mosca](http://www.mosca.io/) is an 'MQTT broker as a module.' It is core to our MQTTS server because it is what makes it an MQTTS server. More details on Mosca can be found on their [GitHub's wiki page](https://github.com/mcollina/mosca/wiki).  


