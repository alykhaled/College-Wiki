const mongoose = require('mongoose');
const SemesterSchema = require('./Semester');
const CourseMapCourseSchema = require('./CourseMapCourse');

const courseMapSchema = new mongoose.Schema({
    name:{type: String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId , ref: "User", required: false},
    program:{type: mongoose.Schema.Types.ObjectId , ref: "Department", required: true},
    courses:[CourseMapCourseSchema],
    semesters:[SemesterSchema],
    credits: {type: Number, required: false},
});

module.exports = mongoose.model('CourseMap',courseMapSchema);