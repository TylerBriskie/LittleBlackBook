var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.js')

router.get('/', auth.logOut ,function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
