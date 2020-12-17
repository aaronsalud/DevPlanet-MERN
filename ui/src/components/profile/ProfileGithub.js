import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '60ac94c7e27e9a1157e3',
      clientSecret: '88529146439703d9c99fddf3f39d1b1db18c4ca1',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
    this.repoView = createRef();
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(response => response.json())
      .then(data => {
         console.log(data);
        if (this.repoView) {
          this.setState({ repos: data });
        }
      })
      .catch(error => console.log(error));
  }
  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank" without rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazer_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref={this.repoView}>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
