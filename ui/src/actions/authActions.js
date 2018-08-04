import axios from 'axios';
import { GET_ERRORS } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(response => history.push('/login'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(response => {
      // Save to localStorage
      const { token } = response.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
