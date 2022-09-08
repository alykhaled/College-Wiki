const mongoose = require('mongoose');

const courseMapCourseSchema = new mongoose.Schema({
    course:{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: true},
    semester:[{type: mongoose.Schema.Types.ObjectId , ref: "Semester", required: true}],
});

module.exports = mongoose.model('CourseMapCourse',courseMapCourseSchema);