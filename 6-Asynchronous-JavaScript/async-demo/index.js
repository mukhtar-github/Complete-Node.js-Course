console.log('Before');
console.log('After');
console.log('Reading a user from a database...');
getUser(1, (user, repo) => {
    // Get user object
    console.log('User', user);

    // Get the repositories
    console.log('Repositories', repo);
});

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        
    }, 2000);

    return [ 'repo1', 'repo2', 'repo3' ];
}