const p = new Promise(function(resolve, reject) {
   // kick off some async work
   // ...
   setTimeout(() => {
      // resolve(1);
      reject(new Error('message'));
   }, 2000);
});

p.then(result => console.log('Result', result));