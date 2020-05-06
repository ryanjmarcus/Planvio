
const db = require('../_helpers/database');
const PArecord = db.PArecord;
const User = db.User;


module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord
}


//TODO: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.
async function getAllPArecords(){
    return await PArecord.find();

}

async function deletePArecord(parecord){
        return await PArecord.deleteOne(parecord);
}



async function addPArecord(parecord, username) {
    if (await PArecord.findOne({createdBy: parecord.createdBy, createdDate: parecord.createdDate})) {
        await PArecord.updateOne({
            createdBy: parecord.createdBy,
            createdDate: parecord.createdDate
        }, {$set: {calories: parecord.calories, minutes: parecord.minutes, activityType: parecord.activityType}})
        return 'Edited!';
    } else {
        dbrecord = new PArecord(parecord);

        // save the record
        await dbrecord.save();
        return 'Added!'
    }
}
