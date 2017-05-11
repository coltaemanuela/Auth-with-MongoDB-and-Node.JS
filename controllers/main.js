//------------------------------------------------------------- Modules and Models -------------------------------------------------
var express     = require('express');
var bcrypt      = require('bcrypt');
var JWT         = require('jsonwebtoken');
var jwt         = require('jwt-simple');
var passport    = require('passport');
FacebookStrategy = require('passport-facebook').Strategy;
var router      = express.Router();
var User        = require('../models/users_model');
var config = require('../config/database');
var configAuth = require('../config/auth');

//------------------------------------------------------------- Routes -------------------------------------------------------------
 router.get('/', function(req, res) {
  res.render('index', { user:'emma', title: 'My Mongo App' });
 });

 router.get('/signup',function(req,res){
  res.render('signup', { title: 'Create Account' });
 }); 
//------------------------------------------------------------- Registration -------------------------------------------------------------
 router.post('/signup',function(req,res){
    if (!req.body.username || !req.body.password) {
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
 
 //------------------------------------------------------------- Authentication -------------------------------------------------------------
 // route to authenticate a user (POST http://localhost:3000/main/authenticate)
 router.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
 
 
 

 router.get('/auth/facebook', passport.authenticate('facebook'));

 router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/users',
                                      failureRedirect: '/' }));
 
 
 passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
    //  done(null, user);
    //});
  }
));

//-------------------------------------------------------------- Export -----------------------------------------------------------
module.exports = router;
