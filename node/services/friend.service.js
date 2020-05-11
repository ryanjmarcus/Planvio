const db = require('../_helpers/database');
const Friend = db.Friend;


module.exports = {
    addFriend,
    getAllFriends
}

async function getAllFriends(){
    return await Friend.find();

}


async function addFriend(friend) {
    console.log(friend);

    friend = new Friend(friend)

    // save the record
    await friend.save();
    return 'Added!'
}

