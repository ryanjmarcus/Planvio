const assignmentService = require('../services/assignment.service')

module.exports = {
    createAssignment,
    getAssignments,
    deleteAssignment
};


function createAssignment(req, res, next) {
    console.log(req.body);
    assignmentService.addAssignment(req.body)
        .then(assignment => res.json(assignment))
        .catch(err => next(err));
}

function deleteAssignment(req, res, next) {
    console.log(req.body);
    assignmentService.deleteAssignment(req.body)
        .then(assignment => res.json(assignment))
        .catch(err => next(err));
}

function getAssignments(req,res,next){
    assignmentService.getAllAssignments()
        .then(assignments => res.json(assignments))
        .catch(err => next(err));

}
