const db = require('../_helpers/database');
const Assignment = db.Assignment;


module.exports = {
    addAssignment,
    getAllAssignments
}

async function getAllAssignments(){
    return await Assignment.find();

}


async function addAssignment(assignment) {
    console.log(assignment);

    assignment = new Assignment(assignment)

    // save the record
    await assignment.save();
    return 'Added!'
}
