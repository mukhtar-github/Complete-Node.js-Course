console.log('Before');

console.log('After');

function getUser() {
    setTimeout(() => {
        console.log('Reading a user from a database...');
    }, 2000);  
}