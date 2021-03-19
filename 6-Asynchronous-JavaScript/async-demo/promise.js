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

// Callback-based approach

// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

// Promise-based approach

// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commits', commits))
//   .catch(err => console.log('Error', err.message));

// async and wait approach

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log('Commits', commits);
  }
  catch (err) {
    console.log('Error', err.message);
  }
}
displayCommits();


console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
      reject(new Error('message'));
    }, 2000);
  });
   
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Calling GitHub API...');
      //resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('Could not get the repos.'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
      reject(new Error('message'));
    }, 2000);
  });
}