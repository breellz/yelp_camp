const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const middleware = require('../midddleware')


router.get('/',  (req, res) => {
  // Get all campgrounds from the  database
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', { campgrounds,currentUser: req.user  })
    }
  })

})

router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
});
//add/:id after /new so it doesnt mess shit up
//shows more info about selected campground

router.get('/:id', (req, res) => {
  //find camp with the id
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log(err)
    } else {
      console.log(campground)
      res.render('campgrounds/show', { campground });
    }
  })
})

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
          res.render('campgrounds/edit', {campground})
        })
  })

//UPDATE CAMPGROUND ROUTE
router.put('/:id',middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updated) => {
    if(err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

//DESTROY CAMPGROUND
router.delete('/:id',middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

router.post('/', (req, res) => {
  // get data from the form and add to database
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price
  const author = {
    id : req.user._id,
    username: req.user.username
  }

  const newCampground = { name, image, description, author, price }
  // add new campground to the database
  Campground.create(newCampground, (err, returnedcampground) => {
    if (err) {
      console.log(err)
    } else {
      console.log(returnedcampground)
      // redirect to campgrounds page
      res.redirect('/campgrounds');
    }
  })
})
module.exports = router