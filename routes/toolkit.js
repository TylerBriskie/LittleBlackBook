var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var suitor = require('../db/suitor.js');


/* all routes are mounted at /toolkit */
router.get('/', function(req, res, next) {
    let date_id = req.query.date_id;
    return knex('date').select('*').where('date_id', date_id).first().then(date=>{
      console.log(date);
      const isSecure = req.app.get('env' != 'development')
      res.cookie('date_id', req.query.date_id, {
          httpOnly: true,
          signed: true,
          secure: isSecure
      });
      let data = {}
      data.id = date.suitor_id;
      data.date_id = req.query.date_id;
      console.log(data);
      res.render('toolkit', {data});
    });
});

router.get('/sos', function(req, res, next) {
    res.render('sos', {
        layout: false
    });
});

// router.get('/common/:suitor_id', function(req, res, next) {
//     //get user_id from signed cookie
//     //get suitor_id from params
//     //querry the interest table where the user_id and suitor_id match
//     //select * from user_interests where user_id is req.params.id (join to interest table)
//     //select * from user_interests where user_id is req.params.id (join to interest table)
//     //iterate (for loop) over (javascript find common values in two arrays)
//     //then render common view and append in interests
//     res.render('common');
// });

//test url: http://localhost:3000/toolkit/their?suitor_id=2
router.get('/their/:id', (req, res) => {
    //use suitor_id from req.params.suitor_id to find it's matching interest_id in the suitor_interest table
    //then use that matching interest_id to look up the interest.name in the interest table
    //now need a join to pull interest by interest_id from the interests table
    knex.select('*').from('suitor_interest')
        .where('suitor_id', req.params.id)
        .join('interest', 'suitor_interest.interest_id', 'interest.id')
        .then((suitor_interest) => {
          suitor_interest.date_id = req.signedCookies.date_id;
          console.log(suitor_interest);
            res.render('toolkit-their-interests', {
                suitor_interest
            });
        });
})



module.exports = router;
