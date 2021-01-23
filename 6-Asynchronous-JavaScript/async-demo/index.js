console.log('Before');
console.log('After');
console.log('Reading a user from a database...');
getUser(1, (user) => {
    console.log('User', user);
});

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}