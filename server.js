// Load express
var createError = require('http-errors');
var express = require('express');
var path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//keep this below cookie parser and morgan
var session = require('express-session')
var passport = require('passport');
var methodOverride = require('method-override');


require('dotenv').config();
require('./config/database');
//configure passport middleware
require('./config/passport');



var indexRouter = require('./routes/index');
var cafesRouter = require('./routes/cafes');
var reviewsRouter = require('./routes/reviews');

// Create our express app
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
// Mount middleware (app.use)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
//keep below cookie!
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//keep below passport

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/cafes', cafesRouter);
app.use('/', reviewsRouter);





app.use(function(req, res, next) {
    next(createError(404));
  });


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


module.exports = app;