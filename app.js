const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const localStrategy = require('passport-local')
const methodOverride = require('method-override');
const flash = require('connect-flash')
const Campground = require('./models/campground')
const seedDB = require('./seeds');
const Comment = require('./models/comment')
const User = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds'),
  commentRoutes = require('./routes/comments'),
  authRoutes = require('./routes/auth');

const app = express();
// seedDB();
mongoose.connect('mongodb://localhost/yelp_camp');
//======================================================
//passport configuration
// =====================================================
app.use(require('express-session')({
  secret: 'not what you think it is',
  resave: false,
  saveUninitialized: false
}));

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=========================================
// pass current user to all routes
//==========================================
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

//routes
app.use(authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(4000, () => {
  console.log(`listening on port 4000`)
});