const db = require('../_helpers/database');
const Course = db.Course;


module.exports = {
    addCourse,
    getAllCourses,
    deleteCourse
}

async function getAllCourses(){
    return await Course.find();

}


async function addCourse(course) {
    if (await Course.findOne({username: course.username, createdAt: course.createdAt})) {
        await Course.updateOne({
            username: course.username,
            createdAt: course.createdAt
        }, {$set: {title: course.title, days: course.days, startTime: course.startTime, endTime: course.endTime, instructorName: course.instructorName, instructorImage: course.instructorImage}})
        return 'Edited!';
    } else {
        console.log(course);

        course = new Course(course)

        // save the record
        await course.save();
        return 'Added!'
    }
}

async function deleteCourse(course) {
    return await Course.deleteOne({createdAt: course.createdAt});
}

