var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var protect = require('../db/encryption.js');
var auth = require('../auth/auth.js');
/* GET users listing. */


router.get('/', function(req, res, next) {
    res.redirect(`/profile/${req.signedCookies.user_id}`)
});


router.get('/:id', auth.allowAccess, function(req, res, next) {
    knex('profile').where('id', req.params.id).first().then(data => {
        res.render('profile', {
            data
        });
    })

});



router.post('/:id/update', auth.allowAccess, function(req, res, next) {
    let profile = req.body;
    console.log(profile);
    if (profile.password.length > 0) {
        knex.select().table('profile').where('id', req.params.id).first()
            .then(data => {
                protect.decrypt(data.password, profile.password).then(result => {
                    if (result) {
                        console.log("password is correct")
                        if ((profile.new_password === profile.new_password_verify) && (profile.new_password.length > 7)) {
                            console.log("passwords match")
                            req.body.new_password = protect.encrypt(req.body.new_password).then(data => {
                                knex('profile').where('id', req.params.id).update({
                                    first_name: profile.first_name,
                                    last_name: profile.last_name,
                                    email: profile.email,
                                    password: data
                                }).then(data => {
                                    res.redirect(`/profile/${req.params.id}`);
                                });
                            })
                        } else {
                            console.log("new passwords do not match or not long enough.")
                            res.redirect(`/profile/${req.params.id}`);
                        }
                    } else {
                        console.log("incorrect Password");
                        res.redirect(`/profile/${req.params.id}`);
                    }
                });
            });
    } else {
        knex('profile').where('id', req.params.id).update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }).then(data => {
            res.redirect(`/`)
        });
    }

});

router.post('/:id/updatePhoto', auth.allowAccess, function(req, res, next) {
    console.log(req.body.photo_url)
    knex('profile').where('id', req.params.id).update({
        image_url: req.body.photo_url
    }).then(data => {
        res.redirect(`/profile/${req.params.id}`);
    })

});

router.delete('/:id/delete', auth.allowAccess, function(req, res, next) {
    knex('profile').where('id', req.params.id).first().del().then(data => {
        if(!req.signedCookies.is_admin) {
        res.clearCookie('user_id');
        res.redirect('/')
      } else res.redirect('/admin')
    });
});

module.exports = router;
