console.log('Before');
console.log('After');
console.log('Reading a user from a database...');
getUser(1, (user) => {
    // Get user object
    console.log('User', user);

    // Get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
    });

});

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}