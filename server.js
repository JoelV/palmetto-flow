var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app =  express();

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json());

app.listen(3000);
