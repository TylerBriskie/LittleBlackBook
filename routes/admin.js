var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var protect = require('../db/encryption.js');
var profile = require('../db/profile.js');

router.get('/', (req, res, next) => {
    knex('profile').select().then(profiles => {
        res.render('admin', {
            profiles,
            layout: false
        });
    })

})

router.post('/', (req, res, next) => {
    if (validUser(req.body)) {
        profile.checkIfProfileExisits(req.body)
            .then((result) => {
                if (result === undefined) {
                    req.body.password = protect.encrypt(req.body.password)
                        .then((data) => {
                            const newProfile = {
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email: req.body.email,
                                password: data,
                                image_url: req.body.image_url
                            };
                            profile.storeNewProfile(newProfile);
                        });
                }
            }).then((data) => {
                res.redirect('/admin')
            }).catch(error => {});

    } else {
        next(new Error('Invalid User Credentials'))
    }
});

function validUser(user) {
    return typeof user.first_name == 'string' &&
        user.first_name.trim() != '' &&
        typeof user.last_name == 'string' &&
        user.last_name.trim() != '' &&
        typeof user.email == 'string' &&
        user.email.trim() != '' &&
        typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.length > 5 &&
        typeof user.image_url == 'string' &&
        user.image_url.trim() != ''
}

module.exports = router;
