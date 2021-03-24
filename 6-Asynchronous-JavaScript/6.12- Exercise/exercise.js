// Callback-based approach 

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// Promise-based approach
// getCustomer(1)
//   .then(customer => console.log('Customer', customer))
//   .then(movies => if (customer.isGold) getTopMovies('Movies', movies)
//   .then()

// async and wait approach

async function notifyCustomer() {
    const customer = await getCustomer(1);
}

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    });
  }, 4000);  
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['movie1', 'movie2']);
  }, 4000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}