import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

const PostItem = ({ post, auth, showActions, deletePost, addLike, removeLike }) => {

  const findUserLike = likes => (likes.filter(like => like.user === auth.user.id).length > 0) ? true : false

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profile/${post.user}`}>
            <img className="rounded-circle d-none d-md-block" src={post.avatar} alt=""/>
          </Link>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (
            <span>
              <button onClick={() => addLike(post._id)} type="button" className="btn btn-light mr-1">
                <i className={classnames('fas fa-thumbs-up', { 'text-info': findUserLike(post.likes)})}/>
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button onClick={() => removeLike(post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
              {post.user === auth.user.id ? (
                <button className="btn btn-danger mr-1" type="button" onClick={() => deletePost(post._id)}>
                  {' '}<i className="fas fa-times" />{' '}
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );

}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
