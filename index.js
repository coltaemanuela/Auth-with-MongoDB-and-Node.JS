//-------------------------------------------------------------Modules--------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose= require('mongoose');
var connectMongo=require('connect-mongo');
var app = express();
//---------------------------------------------------------------Set up view engine---------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//------------------------------------------------Routes---------------------------------------------------------------------------
app.get('/', function (req, res) {
    res.send('hello');
});

//------------------------------------------------Server-------------------------------------------------------------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});