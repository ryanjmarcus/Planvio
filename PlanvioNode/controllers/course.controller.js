const courseService = require('../services/course.service')

module.exports = {
    createCourse,
    getCourses
};


function createCourse(req, res, next) {
    console.log(req.body);
    courseService.addCourse(req.body)
        .then(course => res.json(course))
        .catch(err => next(err));
}

function getCourses(req,res,next){
//TODO: return all parecords from the database and send to the client.
    courseService.getAllCourses()
        .then(courses => res.json(courses))
        .catch(err => next(err));

}
