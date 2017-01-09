var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var auth = require('../auth/auth.js');

router.get('/', function(req,res,next){
  res.redirect(`/contacts/${req.signedCookies.user_id}`)
});

router.get('/:id', auth.allowAccess, function(req, res, next) {
  knex.select('*').from('suitor').where('profile_id', req.params.id).then(data=>{
    res.render('contacts', {data:data});
  })
});

router.post('/:id/addnew', function(req,res,next){
  var newSuitor = {
    name: req.body.name,
    profile_id: req.params.id,
    age: req.body.age,
    where_met: req.body.where_met,
    rating: req.body.rating,
    image_url: req.body.image_url,
    note: req.body.notes
  }
  knex('suitor').insert(newSuitor).returning('profile_id').then(data=>{
    res.redirect('/')
  })
})

// router.get('/:id/suitor/:suitor_id', function(req, res, next) {
//   knex('suitor').where('id', req.params.suitor_id).then(data=>{
//     res.render('contacts', {data});
//   })
// });


module.exports = router;
