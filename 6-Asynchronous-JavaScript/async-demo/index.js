console.log('Before');
getUser(1);
console.log('After');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
    }, 2000);  
}