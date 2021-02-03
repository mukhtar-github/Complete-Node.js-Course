const p = new Promise(function(resolve, reject) {
   // kick off some async work
   // ...
   setTimeout(() => {}, 2000);
   resolve(1);
   // reject(new Error('message'));
});

p.then(result => console.log('Result', result));