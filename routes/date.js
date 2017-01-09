var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var moment = require('moment');

router.get('/', function(req, res, next) {
    res.redirect(`date/${req.signedCookies.user_id}`);
});

router.get('/:id', function(req, res, next) {
    let user_id = req.signedCookies.user_id[0];
    knex.select('*').from('date').where('date.profile_id', req.params.id).join('suitor', 'date.suitor_id', 'suitor.id').orderBy('date.date', 'desc').then((date) => {
        for (i = 0; i < date.length; i++) {
            date[i].date = moment(date[i].date).format('MMM Do');
        }
        console.log(date);
        res.render('date', {
            date
        });
    })
});

module.exports = router;
