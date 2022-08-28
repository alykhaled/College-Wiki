const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name:{type: String, required: true},
    code:{type: String, required: true},
    semester:[{type: String, required: false}],
    creditHours:{type: Number, required: false},
    description:{type: String, required: false},
    // type:{type: String, required: false},
    preReq:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
    professor:[{type: mongoose.Schema.Types.ObjectId , ref: "Professor", required: false}],
    links:[{type: String, required: false}],
    group:{type: String, required: false},

    // Some courses have prerequisites that you must finish a number of credit hours before you can take this course.
    preReqHours:{type: Number, required: false},
    
    preReqReverse:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
});

module.exports = mongoose.model('Course',CourseSchema);