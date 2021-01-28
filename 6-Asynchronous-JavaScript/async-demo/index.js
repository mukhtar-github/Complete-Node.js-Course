console.log('Before');
console.log('Reading a user from a database...');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo, displayCommits);
        //console.log('Repos', repos);
    });
    // Get user object
    //console.log('User', user);

});
console.log('After');

function displayCommits(commits) {
    console.log(commits);
}

// Synchronous
console.log('Before');
const user = getUser(1);
const repo = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');


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