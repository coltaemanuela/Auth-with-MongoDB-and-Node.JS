//-------------------------------------------------------------Modules and Models ------------------------------------------------------
var express = require('express');
var router = express.Router();

var User=require('../models/users_model');

//-------------------------------------------------------------Routes--------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', { user:'emma', title: 'Express App' });
});


router.get('/signup',function(req,res){
  res.render('signup', { title: 'Sign up' });
}); 

router.post('/signup',function(req,res){
  
     var user= new User({
      email: req.body.email,
      password:req.body.password
      });
     user.save(function (err) {
      if (err) {
        return res.send("oops!");
          
      }
      
       res.send("success!");
     });
  
  });

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;