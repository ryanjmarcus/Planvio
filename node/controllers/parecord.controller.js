const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};


function createPArecord(req, res, next) {
  //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    parecordService.addPArecord(req.body, req.user.sub)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getPArecords(req,res,next){
//TODO: return all parecords from the database and send to the client.
    parecordService.getAllPArecords()
        .then(parecords => res.json(parecords))
        .catch(err => next(err));

}


function deletePArecord(req,res,next){

//TODO: delete parecord from the database and respond to the client by conforming the action.
    parecordService.deletePArecord(req.body)
        .then(() => res.json(req.body))
        .catch(err => next(err));
}
