var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var protect = require('../db/encryption.js');
// var cookieParser = require('cookie-parser');



router.get('/', function(req, res, next) {
    protect.encrypt(req.query.password).then(hash => {res.send(hash)});


});
/* GET home page. */
router.post('/', function(req, res, next) {
    let profile = req.body;
    knex.select().table('profile').where('email', profile.email).first()
        .then(data => {
            if(data=== undefined) {
              next(new Error('User does not Exist'))
            }
            protect.decrypt(data.password, profile.password).then(result => {
                if (result != undefined) {
                    if (data.is_admin === true) {
                        const isSecure = req.app.get('env' != 'development')
                        res.cookie('is_admin', data.id, {
                            httpOnly: true,
                            signed: true,
                            secure: isSecure
                        });
                        res.cookie('user_id', data.id, {
                            httpOnly: true,
                            signed: true,
                            secure: isSecure
                        });
                        res.redirect('admin');

                    } else {
                        console.log(data.id);
                        const isSecure = req.app.get('env' != 'development')
                        res.cookie('user_id', data.id, {
                            httpOnly: true,
                            signed: true,
                            secure: isSecure
                        });
                        res.redirect(`/profile/${data.id}`);
                    }
                }
            }).catch(error => {
                res.redirect('/')
            })
        })

});

module.exports = router;
