var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var index = require('./routes/index');
var profile = require('./routes/profile');
var contact = require('./routes/contact');
var login = require('./routes/login');
var admin = require('./routes/admin');
var contacts = require('./routes/contacts');
var signup = require('./routes/signup');
var toolkit = require('./routes/toolkit');
var logout = require('./routes/logout')
var auth = require('./auth/auth.js');
var plan_date = require('./routes/plan_date')
var review_date = require('./routes/review_date')
var date = require('./routes/date');
var app = express();
// var bindings = require('bindings')('bcrypt_lib');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use('/', index);
app.use('/profile', auth.ensureLoggedIn, profile);
app.use('/contact', auth.ensureLoggedIn, auth.setUser, contact);
app.use('/login', login);
app.use('/admin', auth.adminOnly, admin);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/contacts', auth.ensureLoggedIn, auth.setUser, contacts);
app.use('/toolkit', auth.ensureLoggedIn, toolkit);
app.use('/plan_date', auth.ensureLoggedIn, plan_date);
app.use('/review_date', review_date);
app.use('/date', auth.ensureLoggedIn, date);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});



module.exports = app;
