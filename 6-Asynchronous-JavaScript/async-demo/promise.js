const p = new Promise(function(resolve, reject) {
   // kick off some async work
   // ...
   setTimeout(() => {
      resolve(1);
   }, 2000);
   // reject(new Error('message'));
});

p.then(result => console.log('Result', result));