console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}