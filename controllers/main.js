//-------------------------------------------------------------Modules and Models ------------------------------------------------------
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var router = express.Router();
var User=require('../models/users_model');

//-------------------------------------------------------------Routes--------------------------------------------------------------
 router.get('/', function(req, res) {
  res.render('index', { user:'emma', title: 'My Mongo App' });
 });

 router.get('/signup',function(req,res){
  res.render('signup', { title: 'Create Account' });
 }); 

 router.post('/signup',function(req,res){  

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
  });

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;