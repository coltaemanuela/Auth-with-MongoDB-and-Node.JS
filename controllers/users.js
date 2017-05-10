//-------------------------------------------------------------Modules and Models ------------------------------------------------------
var express = require('express');
var router = express.Router();
var User=require('../models/users_model');

//-------------------------------------------------------------Routes--------------------------------------------------------------
router.get('/', function(req, res) {
    User.find(function (err, users) {
        if (err) { return res.status(500).end(err.message); }
        res.json(users);
    });
});

//-------------------------------------------------------------- Export -----------------------------------------------------------

module.exports = router;