//-------------------------------------------------------------Modules and Models ------------------------------------------------------
var express = require('express');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var router = express.Router();
var User=require('../models/users_model');

//-------------------------------------------------------------Routes--------------------------------------------------------------
 router.get('/', function(req, res, next) {
  res.render('index', { user:'emma', title: 'My Mongo App' });
 });

 router.get('/signup',function(req,res){
  res.render('signup', { title: 'Sign up' });
 ); 

 router.post('/signup',function(req,res){  
     
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
             
             var user= new User({
                username: req.body.username,
                email: req.body.email,
                password: hash // req.body.password
             });
             
            user.save(function (err) {
            if (err) {
              console.log(req.body);
              return res.send("oops!");          
            }      
             res.send("success! An account for user "+ req.body.username +' has been created sucessfully!');
           });
        });
    }); 
  });

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;