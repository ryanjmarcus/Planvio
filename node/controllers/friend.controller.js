const friendService = require('../services/friend.service')

module.exports = {
    createFriend,
    getFriends
};


function createFriend(req, res, next) {
    friendService.addFriend(req.body)
        .then(friend => res.json(friend))
        .catch(err => next(err));
}

function getFriends(req,res,next){
//TODO: return all parecords from the database and send to the client.
    friendService.getAllFriends()
        .then(friends => res.json(friends))
        .catch(err => next(err));

}
