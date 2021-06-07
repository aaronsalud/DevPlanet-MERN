import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPost } from '../../actions/postActions';

const Post = ({ match, post, getPost }) => {

  useEffect(() => getPost(match.params.id), []);

  const loadPost = () => {
    const { loading } = post;
    const postData = post.post

    if (!postData || loading || Object.keys(postData).length === 0) return <Spinner />

    return (
      <div>
        <PostItem post={postData} showActions={false} />
        <CommentForm postId={postData._id} />
        <CommentFeed postId={postData._id} comments={postData.comments} />
      </div>
    );
  };

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
          </div>
          <div className="col-md-12">{loadPost()}</div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
