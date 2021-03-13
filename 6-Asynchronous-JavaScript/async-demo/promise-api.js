//Resolved Promise for User Objects

// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

//Rejected Promise for Error Objects

// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(error => {
//     return console.log(error);
// });

// const p = Promise.reject('reason for rejection...');
// p.catch(error => console.log(error));


// Running Promises in Parallel

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
 });

 // If a Promise Fails we reject it with an error

//  const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Async operation 1...');
//         reject(new Error('Because something failed.'));
//     }, 2000);
//  });

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
 });

// The Use of Promise.all

//  Promise.all([p1, p2])
//  .then(result => console.log('Result', result))
//  .catch(err => console.log('Error', err.message));

// The Use of Promise.race

Promise.race([p1, p2])
 .then(result => console.log('Result', result))
 .catch(err => console.log('Error', err.message));