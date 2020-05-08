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
        dueDay: {type: String, required: true},
        dueTime: {type: String, required: true},
        label: {type: String, required: true},
        courseTitle: {type: String, required: true},
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', schema);
