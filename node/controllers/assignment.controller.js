const assignmentService = require('../services/assignment.service')

module.exports = {
    createAssignment,
    getAssignments
};


function createAssignment(req, res, next) {
    console.log(req.body);
    assignmentService.addAssignment(req.body)
        .then(assignment => res.json(assignment))
        .catch(err => next(err));
}

function getAssignments(req,res,next){
//TODO: return all parecords from the database and send to the client.
    assignmentService.getAllAssignments()
        .then(assignments => res.json(assignments))
        .catch(err => next(err));

}
