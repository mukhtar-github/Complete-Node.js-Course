const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const authenticate = require('./authenticate');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// Db Work...
dbDebugger('Connected to the database...');

app.use(logger);
app.use(authenticate);

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// GET all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET a single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// POST Endpoint
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(courses);
    res.send(course);
});

// PUT Requests
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const { error } = validateCourse(req.body);
   
    if(error) return res.status(400).send(error.details[0].message);
        
    course.name = req.body.name;
    res.send(course);
});

// DELETE Request
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// Validate Function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

   return Joi.validate(course, schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Testing
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
