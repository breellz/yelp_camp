const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')


router.get('/', (req, res) => [
  res.render('landing')
]);


//====================
//AUTH ROUTES
//====================
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username})
  const password = req.body.password
  User.register(newUser, password, (err, user) => {
    if(err) {
      req.flash('error', err.message)
      return res.redirect('/register')
    }
    passport.authenticate('local')(req, res, ()=>{
      req.flash('success', `Welcome ${user.username}`)
      res.redirect('/campgrounds')
    })
  })
})

//============
// login route
//============
router.get('/login', (req, res) => {
res.render('login')
})

//handle login

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect:'/login'
}), (req, res) => {
  
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'successfully logged out')
  res.redirect('/campgrounds')
})
module.exports = router;