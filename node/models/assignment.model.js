const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// export class Assignment {
//   title: string;
//   dueDay: string;
//   dueTime: string;
//   label: string;
//   course: Course;
// }

const schema = new Schema({
        title: {type: String, unique: false, required: true},
        dueDay: {type: Date, required: true},
        dueTime: {type: String, required: true},q
        courseTitle: {type: String, required: true},
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', schema);
