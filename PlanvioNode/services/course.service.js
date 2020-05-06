const db = require('../_helpers/database');
const Course = db.Course;


module.exports = {
    addCourse,
    getAllCourses
}

async function getAllCourses(){
    return await Course.find();

}


async function addCourse(course) {
    console.log(course);

    course = new Course(course)

    // save the record
    await course.save();
    return 'Added!'
}

