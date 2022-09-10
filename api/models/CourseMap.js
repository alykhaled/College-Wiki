const mongoose = require('mongoose');
const SemesterSchema = require('./Semester');
const CourseMapCourseSchema = require('./CourseMapCourse');

const CourseMapElectiveSchema = new mongoose.Schema({
    group:{type: String, required: true},
    coursesTaken:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
    creditHoursTaken:{type: Number, required: true},
    mustTakeCoursesLeft:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
});

const courseMapSchema = new mongoose.Schema({
    name:{type: String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId , ref: "User", required: false},
    program:{type: mongoose.Schema.Types.ObjectId , ref: "Department", required: true},
    courses:[CourseMapCourseSchema],
    semesters:[SemesterSchema],
    credits: {type: Number, required: false},
    electiveGroups: [CourseMapElectiveSchema],
});

module.exports = mongoose.model('CourseMap',courseMapSchema);