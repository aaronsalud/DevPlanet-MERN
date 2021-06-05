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
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const profileService = require('../../services/profileService');

// @route GET api/profile
// @desc Get Current User profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
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

// @route GET api/profile/handle/:handle
// @desc  Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc  Get profile by user id
// @access Public
router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar']).lean()
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      if (profile && profile.githubusername) {
        profileService.getGithubRepos(profile.githubusername).then(data => res.json({...profile, githubRepos: data}));
      }
      
      else res.json(profile);
    })
    .catch(err =>
      res
        .status(404)
        .json({ error: 'There is no profile for this user', more_details: err })
    );
});

// @route GET api/profile/all
// @desc  Get all profiles
// @access Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res
        .status(404)
        .json({ error: 'There are no profiles', more_details: err })
    );
});

// @route POST api/profile
// @desc Create or Edit user profile
// @access Private
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
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json(err));
        });
      }
    });
  }
);

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const fields = [
        'title',
        'company',
        'location',
        'from',
        'to',
        'current',
        'description'
      ];
      let newExperience = {};

      fields.forEach(field => {
        if (req && req.body && req.body[field]) {
          newExperience[field] = req.body[field];
        }
      });

      // Add to experience array
      profile.experience.unshift(newExperience);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route POST api/profile/education
// @desc  Add education to profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const fields = [
        'school',
        'degree',
        'fieldofstudy',
        'from',
        'to',
        'current',
        'description'
      ];
      let newEducation = {};

      fields.forEach(field => {
        if (req && req.body && req.body[field]) {
          newEducation[field] = req.body[field];
        }
      });

      // Add to experience array
      profile.education.unshift(newEducation);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience from a profile
// @access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out index from the experience array
      profile.experience.splice(removeIndex, 1);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc  Delete education from a profile
// @access Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out index from the education array
      profile.education.splice(removeIndex, 1);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route DELETE api/profile/
// @desc  Delete user and profile
// @access Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(profile => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json(err));
    });
  }
);

module.exports = router;
