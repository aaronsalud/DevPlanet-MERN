import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ auth, profile, getCurrentProfile, deleteAccount }) => {

  useEffect(() => getCurrentProfile(), []);

  const { user } = auth;
  const { loading } = profile;
  const profileData = profile.profile;

  const loadContent = () => {
    if (!profileData && loading) return <Spinner />

    // Check if logged in user has profile data
    else if (profileData && Object.keys(profileData).length > 0) {
      return (
        <div>
          <p className="lead text-muted">
            <span style={{marginRight:'5px'}}>Welcome</span>
            <Link to={`/profile/${profileData.user._id}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience data={profileData.experience} />
          <Education data={profileData.education} />
          <div style={{ marginBottom: '60px' }}>
            <button onClick={e => deleteAccount()} className="btn btn-danger">Deactivate My Account</button>
          </div>
        </div>
      );
    }
    // User is logged in but has no profile
    return (
      <div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
      </div>
    );

  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {loadContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
