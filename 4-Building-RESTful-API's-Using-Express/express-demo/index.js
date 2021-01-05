const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

//Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//Get a single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//Testing
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});