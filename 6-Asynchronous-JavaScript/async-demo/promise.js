const p = new Promise(function(resolve, reject) {
   // kick off some async work
   // ... 
   resolve(1);
   // reject(new Error('message'));
});

p.then(result => console.log('Result', result));