import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const loadProfileList = () => {
    const { profiles, loading } = profile;
    if (!profiles || loading) return <Spinner />;
    if (profiles.length > 0) {
      return profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    }
    return <h4>No profiles found...</h4>;
  }

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
              </p>
            {loadProfileList()}
          </div>
        </div>
      </div>
    </div>
  );

}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
