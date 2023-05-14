// Load express
const express = require('express');
const path = require('path')


require('dotenv').config();
require('./config/database');

// Create our express app
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  
// Mount middleware (app.use)


// Define a "root" route directly on app
// Tomorrow, we'll use best practice routing
app.get('/', function (req, res) {
  res.send('<h1>Home Page</h1>');
});

app.get('/home', function(req, res) {
    res.render('home');
  });

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function () {
  console.log('Listening on port 3000');
});