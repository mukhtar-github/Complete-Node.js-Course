const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log(' Connected to MongoDB...'))
.catch(err => console.error('Coulld not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: { $in: [ 'frontend', 'backend'] } })
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}
  
run();