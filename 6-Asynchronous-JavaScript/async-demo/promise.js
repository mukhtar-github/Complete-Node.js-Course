/*const p = new Promise((resolve, reject) => {
   // kick off some async work
   // ...
   setTimeout(() => {
      resolve(1); // pending => resolved, fulfilled
      reject(new Error('message')); // pending => rejected
   }, 2000);
});

p
.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));*/


// Replacing Callbacks with Promises

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  });
   
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}