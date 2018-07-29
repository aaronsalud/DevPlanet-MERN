const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');

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

module.exports = router;
