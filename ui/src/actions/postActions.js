import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types';

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(response =>
      dispatch({
        type: ADD_POST,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Get All Posts
export const getPosts = () => dispatch => {
  dispatch(setPostsLoading);
  axios
    .get('/api/posts')
    .then(response =>
      dispatch({
        type: GET_POSTS,
        payload: response.data
      })
    )
    .catch(error => dispatch({ type: GET_POSTS, payload: null }));
};

// Set loading state
export const setPostsLoading = () => {
  return {
    type: POST_LOADING
  };
};
