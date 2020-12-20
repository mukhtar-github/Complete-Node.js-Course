const express = require('express');
const app = express();

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
    res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
