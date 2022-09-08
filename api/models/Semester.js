const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    type: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId , ref: "CourseMapCourse", required: false}],
    credits: {type: Number, required: false},
    maxCredits: {type: Number, required: false},
});

module.exports = mongoose.model('Semester',SemesterSchema);