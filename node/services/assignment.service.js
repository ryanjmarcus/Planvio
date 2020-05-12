const db = require('../_helpers/database');
const Assignment = db.Assignment;


module.exports = {
    addAssignment,
    getAllAssignments,
    deleteAssignment
}

async function getAllAssignments(){
    return await Assignment.find();

}


async function addAssignment(assignment) {
    if (await Assignment.findOne({username: assignment.username, createdAt: assignment.createdAt})) {
        await Assignment.updateOne({
            username: assignment.username,
            createdAt: assignment.createdAt
        }, {$set: {title: assignment.title, dueDay: assignment.dueDay, dueTime: assignment.dueTime, courseTitle: assignment.courseTitle}})
        return 'Edited!';
    } else {

        console.log(assignment);

        assignment = new Assignment(assignment)

        // save the record
        await assignment.save();
        return 'Added!'
    }
}

async function deleteAssignment(assignment) {
    return await Assignment.deleteOne({createdAt: assignment.createdAt});
}
