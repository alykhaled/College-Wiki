const mongoose = require('mongoose');
const CourseMapCourseSchema = require('./CourseMapCourse');

const SemesterSchema = new mongoose.Schema({
    type: {type: String, required: true},
    order: {type: Number, required: true},
    courses: [CourseMapCourseSchema],
    credits: {type: Number, required: false},
    maxCredits: {type: Number, required: false},
});

module.exports = SemesterSchema;