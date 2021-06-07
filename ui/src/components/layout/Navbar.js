import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const Navbar = ({ auth, clearCurrentProfile, logoutUser }) => {
  const onLogoutClick = e => {
    e.preventDefault();
    clearCurrentProfile();
    logoutUser();
  };

  const { isAuthenticated, user } = auth;

  const loadAuthLinks = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/feed" className="nav-link">Post Feed</Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogoutClick} href="/" className="nav-link">
          <img className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} src={user.avatar} alt={user.name} title="You must have a Gravatar connected to your email to display an image " />
          <span style={{ marginLeft: '2px' }}>Logout</span>
        </a>
      </li>
    </ul>
  );

  const loadGuestLinks = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">DevPlanet</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">Developers</Link>
            </li>
          </ul>
          {isAuthenticated ? loadAuthLinks() : loadGuestLinks()}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
