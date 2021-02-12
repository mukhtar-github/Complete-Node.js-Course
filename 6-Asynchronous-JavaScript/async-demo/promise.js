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
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

getUser(1).then(user => console.log('User', user));

//.catch(err => console.log('Error', err.message));


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

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  });
}