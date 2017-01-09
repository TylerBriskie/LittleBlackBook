var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var moment = require('moment');
var methodOverride = require('method-override')
var auth = require('../auth/auth.js');

/* routes are mounted at review_date */
/* pull in date info with render http://localhost:3000/review_date?date_id=7 */
router.get('/', auth.verifyReview,  (req, res,next) => {
    let date_id = Number(req.signedCookies.date_id);
    return knex('date')
        .where('date_id', req.query.date_id)
        .first()
        .then((date_data) => {
            return date_data
        }).then((date_data) => {
            knex.select('*')
                .from('date')
                .where('date.date_id', req.query.date_id)
                .join('suitor', 'date.suitor_id', 'suitor.id')
                .then((date_data) => {
                    date_data[0].date = moment(date_data.date).format('MMM Do');
                    let date = date_data[0];
                    res.render('review_date', {
                        date
                    });
                })

        })
})



//update date info
router.put('/', (req, res, next) => {
    console.log(req.body);
    var dateReview = {
        date_review: req.body.rating,
        date_note: req.body.note,
        has_occured: true
    }
    console.log(req.signedCookies.date_id);
    knex('date').where('date_id', req.signedCookies.date_id).update(dateReview).then(data => {
        res.clearCookie('date_id');
        res.redirect(`/date`)
    })
})

module.exports = router;
