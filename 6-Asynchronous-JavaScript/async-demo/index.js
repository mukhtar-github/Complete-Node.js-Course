console.log('Before');
console.log('After');
console.log('Reading a user from a database...');
getUser(1, (user) => {
    console.log('User', user);

    // Get the repositories
});

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}

function getRepositories(username) {
    return ['repo1', 'repo2', 'repo3'];
}