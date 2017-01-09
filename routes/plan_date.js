var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.js');
var knex = require('../db/knex.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(`plan_date/${req.signedCookies.user_id}`);
});

router.get('/:id', auth.allowAccess, function(req,res,next) {
    knex('suitor').where('profile_id', req.params.id).then(data=>{
      data.profile_id = req.params.id
      console.log(data);
      res.render('plan_date', {data});
    });
});

router.get('/get_contact/:id', function(req,res,next){
  knex('suitor').where('id', req.params.id).first().then(suitor => {
      res.send(suitor)
});
});

router.post('/', function(req,res,next){
  let prof_id = Number(req.signedCookies.user_id);
  console.log(typeof prof_id);
  let date = {
    profile_id: prof_id,
    suitor_id: req.body.suitor_id,
    location : req.body.location,
    date: req.body.date,
    time : req.body.time

  }
  knex('date').insert(date).then(()=>{
    res.redirect(`/date`)
  })
  console.log(req.body);
})
module.exports = router;
