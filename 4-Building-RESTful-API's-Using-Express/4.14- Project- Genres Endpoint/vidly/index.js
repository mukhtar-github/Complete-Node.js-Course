const Joi = require('joi');
const genres = require('./routes/genres');
const validateGenre = require('./validator/validate');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use(validateGenre);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));