var http = require('http');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Look ma, no HTML!');
});

module.exports = router;
