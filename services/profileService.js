const axios = require('axios');

const getGithubRepos = (username) => {
    const clientId = require('../config/keys').githubClientId
    const clientSecret = require('../config/keys').githubClientSecret
    const count = 5;
    const sort = 'created: asc';

    return axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then((res) => res.data)
        .catch(err => console.log(err));
}


module.exports = {
    getGithubRepos
}



