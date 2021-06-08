const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log(' Connected to MongoDB...'))
.catch(err => console.error('Coulld not connect to MongoDB..', err));
