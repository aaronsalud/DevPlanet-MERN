import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(response => history.push('/dashboard'))
    .catch(error => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      setTimeout(() => {
        dispatch({ type: CLEAR_ERRORS });
      }, 3000);
    });
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(response => history.push('/dashboard'))
    .catch(error => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      setTimeout(() => {
        dispatch({ type: CLEAR_ERRORS });
      }, 3000);
    });
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(response => history.push('/dashboard'))
    .catch(error => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      setTimeout(() => {
        dispatch({ type: CLEAR_ERRORS });
      }, 3000);
    });
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(response => dispatch({ type: GET_PROFILE, payload: response.data }))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(response => dispatch({ type: GET_PROFILE, payload: response.data }))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(response => dispatch({ type: GET_PROFILES, payload: response.data }))
    .catch(error => dispatch({ type: GET_PROFILES, payload: {} }));
};

// Get Profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(response => dispatch({ type: GET_PROFILE, payload: response.data }))
    .catch(error => dispatch({ type: GET_PROFILE, payload: null }));
};

// Get Profile by user id
export const getProfileByUserId = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${id}`)
    .then(response => dispatch({ type: GET_PROFILE, payload: response.data }))
    .catch(error => dispatch({ type: GET_PROFILE, payload: null }));
};

// Delete account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(response => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(error =>
        dispatch({ type: GET_ERRORS, payload: error.response.data })
      );
  }
};
// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Current Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
