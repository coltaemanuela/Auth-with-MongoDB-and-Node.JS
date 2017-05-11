//------------------------------------------------------------- Modules and Models -------------------------------------------------
var express     = require('express');
var bcrypt      = require('bcrypt');
var JWT         = require('jsonwebtoken');
var jwt         = require('jwt-simple');
var passport    = require('passport');
var router      = express.Router();
var User        = require('../models/users_model');

//------------------------------------------------------------- Routes -------------------------------------------------------------
 router.get('/', function(req, res) {
  res.render('index', { user:'emma', title: 'My Mongo App' });
 });

 router.get('/signup',function(req,res){
  res.render('signup', { title: 'Create Account' });
 }); 

 router.post('/signup',function(req,res){
    if (!req.body.name || !req.body.password) {
        res.json({success: false, msg: 'Please enter a name and a password.'});
    } else {
        var user= new User({
            username: req.body.username,
            email: req.body.email,
            password:  req.body.password 
         });
         
        user.save(function (err) {
        if (err) {
          console.log(req.body);
          return res.send("oops!");          
        }      
         res.send("success! An account for user "+ req.body.username +' has been created sucessfully!');
       });
    }
  });

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;