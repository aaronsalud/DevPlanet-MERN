import React from 'react';
import PropTypes from 'prop-types';

const ProfileGithub = ({ profile }) => {
  const loadGithubRepos = () => {
    const { githubRepos } = profile;
    return githubRepos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">{repo.name}</a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">{`Stars: ${repo.stargazers_count}`}</span>
            <span className="badge badge-secondary mr-1">{`Watchers: ${repo.watchers_count}`}</span>
            <span className="badge badge-success mr-1">{`Forks: ${repo.forks_count}`}</span>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {loadGithubRepos()}
    </div>
  );
}
ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileGithub;
