const mongoose = require('mongoose');

const courseMapSchema = new mongoose.Schema({
    name:{type: String, required: true},
    user:{type: mongoose.Schema.Types.ObjectId , ref: "User", required: false},
    program:{type: mongoose.Schema.Types.ObjectId , ref: "Department", required: true},
    courses:[{type: mongoose.Schema.Types.ObjectId , ref: "CourseMapCourse", required: false}],
    semesters:[{type: mongoose.Schema.Types.ObjectId , ref: "Semester", required: false}],
    credits: {type: Number, required: false},
});

module.exports = mongoose.model('CourseMap',courseMapSchema);