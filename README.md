# Intelligent Conveyor Belt Monitoring
#### Developers: Brandon Kelly, Ben Rieckers, Evan Srock, Joe Loftus
#### Senior Design 2017-2018 CPSC10

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

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
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

You must have three command prompt/terminals open and run the db_api, UI, iot_api, all at once. 

    $ git clone https://github.com/evanliferock/I-Con-monitoring.git
   First fill in your credentials in 
`/iot_api/src/connections/sql.js`
and 
`/db_express_api/src/sql/db.js`.

Then perform the following commands in three different command prompt/terminals and run db_api, UI, iot_api, all at once as directed below:

    $ cd db_express_api/src
    $ npm install
    $ npm start
    $ cd iot_api/src
    $ npm install
    $ npm start
    $ cd UI/src
    $ npm install
    $ npm start

## Update sources

Some packages usage might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands at once you can enter

    $ npm run pull

## Languages & Tools

### SQL

- [SQL](https://en.wikipedia.org/wiki/SQL) is used to manage the data held in our system.

### JavaScript

- [JavaScript](https://www.javascript.com/) is an object-oriented computer programming language commonly used to create interactive effects within web browsers.
- [React](http://facebook.github.io/react) is used for easier user interface development.

### CSS

- [CSS](https://www.w3schools.com/css/) is used for minor styling.

### Internet of Things
- [IoT API](https://en.wikipedia.org/wiki/Internet_of_things): our own IoT API is used to communicate between physical gateways, our database, and display the information back to the user on the user interface.