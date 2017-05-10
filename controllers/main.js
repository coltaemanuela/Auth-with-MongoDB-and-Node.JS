
var express = require('express');
var router = express.Router();
var ERRORS=require('../errors/errors');
var User=require('../models/users_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user:req.session.user, title: 'Express App' });
});

router.get('/signup', function (req, res, next) {
  if (req.session.user) { 
     return res.redirect('/');
   }
   next();
});

function generateSignInUpHandler(title) {
    return function (req, res, next) {
      var err = null;
      
      if (!req.body.email) {
        err = ERRORS.MISSING_EMAIL;
      } else if (!req.body.password) {
        err = ERRORS.MISSING_PASSWORD;
      }
      
      if (err) {
        return res.render('signup', { error: err, title: title });
      }
      
      next();
    };
}

router.post("/signup", generateSignInUpHandler("Sign up"));
router.post("/signup", function (req, res, next) {
  var err = req.body.password !== req.body.confirmpassword ? ERRORS.PASSWORDS_DO_NOT_MATCH : null;
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

//-------------------------------------------------------------------------------------------------------------------------------------
module.exports = router;