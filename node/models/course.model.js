const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//export class Course {
//   title: string;
//   days: string;
//   time: string;
//   instructorName: string;
//   instructorImage: string;
//   username: string;
// }

const schema = new Schema({
            title: {type: String, unique: false, required: true},
            days: {type: [Boolean], required: true},
            startTime: {type: String, required: true},
            endTime: {type: String, required: true},
            instructorName: {type: String, required: true},
            instructorImage: {type: String, required: true},
            username: {type: String, required: true},
            createdAt: { type: Date, required: true }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', schema);
