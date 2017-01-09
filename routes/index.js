var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.js');
/* GET home page. */
router.get('/', auth.loggedInRedirect,function(req, res, next) {
  res.render('index', {layout:false});
});

// router.get('/suitors', (req, res)=>{
//   res.render('index', { title: 'Suitors' })
// })

module.exports = router;
