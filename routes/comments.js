const express = require('express')
const router = express.Router({mergeParams: true})
const Campground  = require('../models/campground')
const Comment  = require('../models/comment')
const middleware = require('../midddleware')

// ===============
// COMMENTS ROUTE
// ===============

router.get('/new', middleware.isLoggedIn, (req, res) => {
  //find campground
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground })
    }
  })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
  // find campground
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      // create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Something went wrong')
          console.log(err)
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //add comment to campground
          campground.comments.push(comment)
          campground.save()
          req.flash('success', 'New comment added')
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

// EDIT COMMENT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if(err) {
      res.redirect('back')
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment})
    }
  })
})

// UPDATE COMMENT ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership,  (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updted) => {
    if (err) {
      res.redirect('back')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})
//DELETE COMMENT ROUTE

router.delete('/:comment_id', middleware.checkCommentOwnership,  (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err) {
      res.redirect('back')
    } else {
      req.flash('success', 'Comment deleted')
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

module.exports = router;
