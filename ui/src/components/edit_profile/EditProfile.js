import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import ProfileForm from '../forms/ProfileForm';

const EditProfile = ({ profile, errors, getCurrentProfile, createProfile, history }) => {

  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => getCurrentProfile(), []);
  useEffect(() => loadFormData(), [profile]);

  const loadFormData = () => {
    if (profile) {
      const profileData = profile.profile;

      if (profileData) {
        // Bring skills array back to Comma separated value
        const skillsCSV = profileData && profileData.skills ? profileData.skills.join(',') : '';

        // Set component fields state
        setFormData({
          handle: profileData.handle,
          company: profileData.company,
          website: profileData.website,
          location: profileData.location,
          status: profileData.status,
          skills: skillsCSV,
          githubusername: profileData.githubusername,
          bio: profileData.bio,
          twitter:
            profileData.social && profileData.social.twitter
              ? profileData.social.twitter
              : '',
          facebook:
            profileData.social && profileData.social.facebook
              ? profileData.social.facebook
              : '',
          linkedin:
            profileData.social && profileData.social.linkedin
              ? profileData.social.linkedin
              : '',
          youtube:
            profileData.social && profileData.social.youtube
              ? profileData.social.youtube
              : '',
          instagram:
            profileData.social && profileData.social.instagram
              ? profileData.social.instagram
              : ''
        });
      }
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  const heading = 'Edit Your Profile'

  return <ProfileForm formData={formData} setFormData={setFormData} errors={errors} onSubmit={onSubmit} heading={heading} />
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile }
)(withRouter(EditProfile));
