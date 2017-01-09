var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var suitor = require('../db/suitor.js');
var auth = require('../auth/auth.js');

/* GET users listing. */
// router.get('/:id', auth.allowAccess, function(req, res, next) {
router.get('/:id', auth.verifyContact, function(req, res, next) {
    knex('suitor').where('id', req.params.id).first().then(suitor => {
        suitor.interests = [];
        suitor.allInterests = [];
        knex.select('*').from('interest').then(allInterests => {
            // let allInterest = {
            //     id: allInterests[0].id,
            //     name: allInterests[0].interest_name
            // };
            suitor.allInterests.push(allInterests);
            console.log(suitor.allInterests[0][1].interest_name);
            // console.log(suitor.allInterests.interest_name);
        }).then(
            knex('suitor_interest')
            .where('suitor_id', req.params.id)
            .then(suitor_interests => {
                let interests = suitor_interests.map((item) => {
                    return knex('interest')
                        .where('id', item.interest_id).then((singleInterest) => {
                            let interest = {
                                id: singleInterest[0].id,
                                name: singleInterest[0].interest_name
                            };
                            suitor.interests.push(interest);
                        })
                })
                return Promise.all(interests)
            }).then(info => {
                for (var j = 0; j < suitor.interests.length; j++) {
                    for (var i = 0; i < suitor.allInterests[0].length; i++) {
                        if (suitor.allInterests[0][i].id == suitor.interests[j].id) {
                            suitor.allInterests[0][i].interest_active = 1;
                        }
                    }
                }
                res.render('contact', {
                    data: suitor
                })
            })
        )
    });
});


router.post('/:id/:contact_id/update', auth.allowAccess, function(req, res, next) {

    console.log(req.body)
    console.log("^^req.body^^")

    knex('suitor_interest')
        .where('suitor_id', req.params.contact_id)
        .del()
        .then(data => {
            if (!req.body.suitor_interests) {} else if (req.body.suitor_interests.length == 1) {
                return knex('suitor_interest')
                    .insert({
                        suitor_id: req.params.contact_id,
                        interest_id: req.body.suitor_interests
                    })
                    //next();
            } else {
                let s = req.body.suitor_interests.map((interest) => {
                    return knex('suitor_interest')
                        .insert({
                            suitor_id: req.params.contact_id,
                            interest_id: interest
                        })
                });
                return Promise.all(s);
            }
        })
        .then(data => {
            res.redirect(`/contacts/`);
        });


    knex('suitor').where('id', req.params.contact_id).update({


            name: req.body.name,
            age: req.body.age,
            where_met: req.body.where_met,
            rating: req.body.rating
        }).then(data => {
            res.redirect(`/contact/${req.params.contact_id}`)
        })
        // re-insert suitor interests
        // req.body.suitor_interests.forEach((interest)=>{
        //   knex('suitor_interest')
        //     .insert({
        //       suitor_id: req.params.id,
        //       interest_id: interest
        //     })
        //     .then(data=>{
        //       res.redirect(`/suitor/${req.params.id}`);
        //     });
        // });
});

router.post('/:id/:contact_id/updatePhoto', auth.allowAccess, function(req, res, next) {
    console.log(req.body.image_url)
    knex('suitor').where('id', req.params.contact_id).update({
        image_url: req.body.image_url
    }).then(data => {
        res.redirect(`/contact/${req.params.contact_id}`);
    })
});

router.get('/:id/:contact_id/delete', auth.allowAccess,function(req, res, next) {
   knex('suitor').where('id', req.params.contact_id).first().del().then(data => {
      res.redirect('/');
   });
});


module.exports = router;
