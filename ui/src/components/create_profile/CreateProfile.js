import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createProfile } from '../../actions/profileActions';
import ProfileForm from '../forms/ProfileForm';

const CreateProfile = ({ errors, createProfile, history }) => {

  const [formData, setFormData] = useState({
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

  const onSubmit = e => {
    e.preventDefault();
    createProfile(profileFormData, history);
  };

  const heading = 'Create Your Profile';
  const subheading = 'Let\'s get some information to make your profile stand out';

  return <ProfileForm formData={formData} setFormData={setFormData} errors={errors} onSubmit={onSubmit} heading={heading} subheading={subheading} />
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
