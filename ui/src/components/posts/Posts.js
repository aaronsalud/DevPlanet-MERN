import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

const Posts = ({ post, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);
  
  const loadPosts = () => {
    const { posts, loading } = post;
    if (!posts && loading) return <Spinner />;
    else return <PostFeed posts={posts} />;
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {loadPosts()}
          </div>
        </div>
      </div>
    </div>
  );
}
Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
