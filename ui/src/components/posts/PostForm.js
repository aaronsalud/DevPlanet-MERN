import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

const PostForm = ({ auth, errors, addPost }) => {
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    const { user } = auth;
    const newPost = {
      text: text,
      name: user.name,
      avatar: user.avatar
    };
    addPost(newPost);
    setText('');
  }

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup placeholder="Create a post" name="text" value={text} onChange={onChange} error={errors.text} />
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

}
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
