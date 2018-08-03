import axios from 'axios';
import { GET_ERRORS } from './types';

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(response => console.log(response.data))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};
