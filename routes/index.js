var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    res.redirect('/cafes');
  });
  

router.get('/auth/google', passport.authenticate(
    //which passport strategy is being used?
    'google',
    {
        scope: ['profile', 'email'],
        //Optional 
        // prompt: 'select_account'
    }
));

router.get('/oauth2callback', passport.authenticate(
'google',
{
    //change to a home page
    successRedirect:'/cafes',
    failureRedirect: '/cafes'
 }
));

router.get('/logout', function(req, res){
    req.logout(function(){
        //Change path for landing(cafes) page mby to home?
        //also go to header ejs and update
        res.redirect('/cafes')
    });
});


module.exports = router;