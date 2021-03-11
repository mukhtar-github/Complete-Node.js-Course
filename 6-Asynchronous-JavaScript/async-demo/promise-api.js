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

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
 });