import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByUserId, clearCurrentProfile } from '../../actions/profileActions';

const Profile = ({ match, profile, getProfileByUserId, clearCurrentProfile }) => {

  useEffect(() => {
    if (match.params.user_id) getProfileByUserId(match.params.user_id);
    return () => clearCurrentProfile();
  }, []);

  const loadUserProfile = () => {
    const profileData = profile.profile;

    if (!profileData) return <Spinner />;

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
          </div>
        </div>
        <div className="col-md-6" />
        <ProfileHeader profile={profileData} />
        <ProfileAbout profile={profileData} />
        <ProfileCreds
          education={profileData.education}
          experience={profileData.experience}
        />
        {profileData.githubRepos && (<ProfileGithub profile={profileData}/>) }
      </div>
    );

  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">{loadUserProfile()}</div>
      </div>
    </div>
  );
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByUserId, clearCurrentProfile }
)(Profile);
