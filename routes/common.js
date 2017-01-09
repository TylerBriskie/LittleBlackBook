var express = require('express');
var router = express.Router();

// how to handle transition from desktop to mobile (have the user send themselves an email?)
// pull id of the logged in user to this page (change route to /:id/toolkit/common)
// pull interests by profile_id
// pull suitor by profile_id (how do we make sure it's the person they are on a date with, they might have to choose by photo, which we would have to bring into this page?)
// pull suitor interests by suitor_id on the suitor_interests join table


router.get('/', (req, res, next) => {
    knex('profile').select().then(data => {
        res.render('admin', {
            data,
            layout: false
        });
    })
})
