// Load express
var express = require('express');
var path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//keep this below cookie parser and morgan
var session = require('express-session')
var passport = require('passport');


require('dotenv').config();
require('./config/database');
//configure passport middleware
require('./config/passport');


var indexRouter = require('./routes/index');
var cafesRouter = require('./routes/cafes');

// Create our express app
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
// Mount middleware (app.use)
app.use(logger('dev'));
app.use(cookieParser());
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
});

app.use('/', indexRouter);
app.use('/cafes', cafesRouter);



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


// Define a "root" route directly on app
// Tomorrow, we'll use best practice routing
// app.get('/', function (req, res) {
//   res.send('<h1>Home Page</h1>');
// });

// app.get('/home', function(req, res) {
//     res.render('home');
//   });

// // Tell the app to listen on port 3000
// // for HTTP requests from clients
// app.listen(3000, function () {
//   console.log('Listening on port 3000');
// });