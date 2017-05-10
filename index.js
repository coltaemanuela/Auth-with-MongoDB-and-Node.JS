//-------------------------------------------------------------Modules--------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose= require('mongoose');
var connectMongo=require('connect-mongo');
mongoose.Promise = require('bluebird');
var app = express();

;
//---------------------------------------------------------------Set up view engine---------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//---------------------------------------------------------------Connect to DB ---------------------------------------------------
var urlDB= 'mongodb://127.0.0.1:27017/admin';
mongoose.connect(urlDB);

var MongoStore = connectMongo(session);
//------------------------------------------------Routes---------------------------------------------------------------------------
var main= require('./controllers/main');
var users = require('./controllers/users');
app.use('/users', users);
app.use('/main', main);


app.get('/', function (req, res) {
    res.send('hello');    
});

//------------------------------------------------Server-------------------------------------------------------------------------

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//-------------------------------------------------------------------------------------------------------------------------------------
module.exports = app;