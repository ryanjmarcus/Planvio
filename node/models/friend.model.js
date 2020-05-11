
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//TODO: notice that User has evolved and not includes 'caloriegoal' and 'minutegoal'.
const schema = new Schema({
        username: { type: String, unique: true, required: true },
        firstName: { type: String, unique: true, required: true },
        lastName: { type: String, required: true },
        addedBy: { type: String, required: true },
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Friend', schema);
