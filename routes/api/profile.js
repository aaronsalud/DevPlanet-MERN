const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

//Load Input Validation
const validateProfileInput = require('../../validation/profile');

// @route GET api /profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route GET api /profile
// @desc Get Current User profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api /profile
// @desc Create or Edit user profile
// @access Privvate
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = { social: {} };
    profileFields.user = req.user.id;

    const fields = [
      'handle',
      'company',
      'location',
      'bio',
      'status',
      'githubusername',
      'website'
    ];

    fields.forEach(field => {
      if (req.body[field]) profileFields[field] = req.body[field];
    });

    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    const socialFields = [
      'youtube',
      'instagram',
      'twitter',
      'facebook',
      'linkedin'
    ];

    // Social
    socialFields.forEach(field => {
      if (req.body[field]) profileFields['social'][field] = req.body[field];
    });

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err));
      } else {
        //Create
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          //Save new Profile
          new Profile(profileFields)
            .save()
            .then(profile =>
              res.json(profile).catch(err => res.status(404).json(err))
            );
        });
      }
    });
  }
);

module.exports = router;
