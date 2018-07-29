const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');

// Profile Model
const Profile = require('../../models/Profile');

// Load Input Validation
const validatePostInput = require('../../validation/post');

// @route POST api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res
        .status(404)
        .json({ nopostsfound: 'No posts found', more_details: err })
    );
});

// @route POST api/posts/:id
// @desc Get a post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res
        .status(404)
        .json({ nopostfound: 'No post found with this ID', more_details: err })
    );
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Get fields
    const postFields = {};
    const fields = ['text', 'name', 'avatar'];

    postFields.user = req.user.id;

    fields.forEach(field => {
      if (req.body[field]) postFields[field] = req.body[field];
    });

    const newPost = new Post(postFields);

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Only allow logged in user to delete their own posts
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: 'User not authorized' });
            }
            // Delete the post
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err =>
                res.status(404).json({ postnotfound: 'No post found' })
              );
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'No post found' })
          );
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/posts/like/:id
// @desc Associate a like to a post
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Only allow logged in user to like their own posts
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'User already like this post' });
            }
            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'No post found' })
          );
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/posts/unlike/:id
// @desc Unlike to a post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Only allow logged in user to like their own posts
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length == 0
            ) {
              return res
                .status(400)
                .json({ havenotliked: 'You have not yet liked this post' });
            }
            // Get Remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //Splice out of array
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'No post found' })
          );
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
