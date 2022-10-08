const mongoose = require('mongoose');
const CourseSchema = require('./Course');

const courseMapCourseSchema = new mongoose.Schema({
    course: CourseSchema,
    semestersOrder:[{type: Number, required: true, default: []}],
    outDegree: {type: Number, required: true, default: 0},
});

module.exports = courseMapCourseSchema;