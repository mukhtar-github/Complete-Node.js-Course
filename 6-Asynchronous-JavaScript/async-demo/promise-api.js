//Resolved Promise for User Objects

// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

//Rejected Promise for Error Objects

// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(error => {
//     return console.log(error);
// });

const p = Promise.reject('reason for rejection...');
p.catch(error => console.log(error));
