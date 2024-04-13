var express = require('express');
const path = require('path');
var router = express.Router();
const userModel=require('./users');
const passport= require('passport');
const localStrategy = require('passport-local');          //allow to person login and use to local strategy
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */

router.get('/',function(req,res){
  res.render('movie');
})


router.get('/home',isLoggedIn,function(req,res){
  res.render('home');
})
router.get('/signup',function(req,res){
  res.render('signup');
})

router.post('/signup',  function(req, res) {
  var userdata= new userModel({
    username:req.body.username,
    password:req.body.password
  });
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/home');
    })
  })
});
router.get('/login',function(req,res){
  res.render('login');
})

router.post('/login',passport.authenticate('local',{
  successRedirect:"/home",
  failureRedirect:"/"
}),function(req,res){})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
  
}


module.exports = router;
