const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name:{type: String, required: true},
    code:{type: String, required: false},
    semster:[{type: String, required: false}],
    creditHours:{type: Number, required: false},
    description:{type: String, required: false},
    preReq:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
    professor:[{type: mongoose.Schema.Types.ObjectId , ref: "Professor", required: false}],
    links:[{type: String, required: false}],
});

module.exports = mongoose.model('Course',CourseSchema);