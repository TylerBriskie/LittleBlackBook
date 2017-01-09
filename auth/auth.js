const knex = require('../db/knex');

function ensureLoggedIn(req, res, next) {
    if (req.signedCookies.user_id) {
        next();
    } else {
        res.status(401);
        next(new Error('Unauthorized'));
    }
}

function loggedInRedirect(req, res, next) {
    if (req.signedCookies.user_id) {
        res.redirect(`/contacts/${req.signedCookies.user_id}`);
    } else next();
}

function adminOnly(req, res, next) {
    if (req.signedCookies.is_admin) {
        next();
    } else {
        res.status(401);
        next(new Error('Unauthorized'))
    }
}

function allowAccess(req, res, next) {
    if ((req.signedCookies.user_id == req.params.id) || req.signedCookies.is_admin) {
        next();
    } else {
        res.status(401);
        next(new Error('Unauthorized'));
    }
}

function logOut(req, res, next) {
    res.clearCookie('user_id');
    res.clearCookie('is_admin');
    next();
}

function setUser(req, res, next) {
    if (req.signedCookies.user_id) {
        let user_id = req.signedCookies.user_id[0]
        knex('profile').where('id', user_id).first().then(user => {
            res.locals.user = user;
            next();
        })
    } else {
        next()
    }
}

function verifyContact(req, res, next) {
    if (req.signedCookies.is_admin) {
        next();
    } else {
        let suitor_id = req.params.id;
        var profile_id = req.signedCookies.user_id[0];
        knex('suitor').where('profile_id', profile_id).then(suitors => {
            let testing = suitors.filter((suitor) => {
                return suitor.profile_id == profile_id && suitor_id == suitor.id;
            });
            if (testing.length > 0) {
                next();
            } else {
                res.status(401);
                next(new Error('Unauthorized'));
            }
        });
    }
}

function verifyReview(req, res, next) {
    if (req.signedCookies.is_admin) {
        next();
    } else {
        let date_id = req.query.date_id;
        var profile_id = req.signedCookies.user_id[0];
        knex('date').where('date_id', date_id).first().then(dateInfo => {
            if (dateInfo.profile_id == profile_id) {
                next()
            } else {
                res.status(401);
                next(new Error('Unauthorized'));
            }
        });
    }
}

module.exports = {
    ensureLoggedIn,
    allowAccess,
    adminOnly,
    logOut,
    loggedInRedirect,
    setUser,
    verifyContact,
    verifyReview
};
