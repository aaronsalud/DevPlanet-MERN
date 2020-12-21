import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from './types';

// Add a Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(response =>
      dispatch({
        type: ADD_POST,
        payload: response.data
      })
    )
    .catch(error => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
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
// Get a single Post
export const getPost = id => dispatch => {
  dispatch(setPostsLoading);
  axios
    .get(`/api/posts/${id}`)
    .then(response =>
      dispatch({
        type: GET_POST,
        payload: response.data
      })
    )
    .catch(error => dispatch({ type: GET_POST, payload: null }));
};

// Delete a post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(response =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Add a like to a post
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(response => dispatch(getPosts()))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Remove a like from a post
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(response => dispatch(getPosts()))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Add a comment to a post
export const addComment = (id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, commentData)
    .then(response => dispatch({ type: GET_POST, payload: response.data }))
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Delete a comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(response =>
      dispatch({
        type: GET_POST,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

// Set loading state
export const setPostsLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear Form Error state
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
