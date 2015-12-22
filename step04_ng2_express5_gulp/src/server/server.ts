/// <reference path='./../../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');

var app:express.Express = express();

app.use(express.static(path.join(__dirname, '/../client')));

app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {
    res.render('index.html');
});

var port:number = process.env.PORT || 3000;
var server = app.listen(port, () => {
    var listeningPort:number = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});