const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now, },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mukhtar',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

// async function getCourses() {
//     const courses = await Course
//     // .find({ author: 'Mukhtar', isPublished: true })
//     // .find( { price: { $gt: 10, $lte: 20 } })
//     // .find( { price: { $in: [10, 25, 20]}})
//     // .find()
//     // .or([{ author: 'Muktar' }, { isPublished: true }])
//     // .and([])

//     // Starts with Mukhtar
//     // .find({ author: /^Mukhtar/ })

//     // Ends with Hamedani
//     // .find({ author: /Hamedani$/i })

//     //Contains Mosh
// .find({ author: /.*Mosh.*/i })

//     .sort( { name: 1, })
//     .select( {name: 1, tags: 1});
//     console.log(courses);
// }

// getCourses();

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
        .find({ author: 'Mukhtar', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1, })
        .count();
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById();
    if (!course) return;

    if (course.isPublished) return;

    course.isPublished = true;
    course.author = 'Another Author';
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });
    
    const result = await course.save();
    console.log(result);

}

updateCourse('5a68fde3f09ad7646ddec17e');