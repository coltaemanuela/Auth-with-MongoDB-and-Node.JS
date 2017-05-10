//-------------------------------------------------------------Modules and Models ------------------------------------------------------
var express = require('express');
var router = express.Router();

var User=require('../models/users_model');

//-------------------------------------------------------------Routes--------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', { user:'emma', title: 'Express App' });
});

function generateSignInUpHandler(title) {
    return function (req, res, next) {
      var err = null;
      
      if (!req.body.email) {
        err = 'missing email';
      } else if (!req.body.password) {
        err = 'missing password';
      }
      
      if (err) {
        return res.render('signup', { error: err, title: title });
      }
      
      next();
    };
}

router.post("/signup", generateSignInUpHandler("Sign up"));
router.post("/signup", function (req, res, next) {
  var err = req.body.password !== req.body.confirmpassword ? 'missing password' : null;
  if (err) {
    return res.render('signup', { error: err, title: "Sign Up" });
  }
  next();
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
        return res.render('signup', { error: err.message, title: 'Sign up' });      
      }
      res.redirect("/signup");
     });
  
  });

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;