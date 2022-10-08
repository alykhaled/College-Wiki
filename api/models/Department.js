const mongoose = require('mongoose');

const ElectiveSchema = new mongoose.Schema({
    group:{type: String, required: true},
    coursesNumber:{type: Number, required: true},
    creditHours:{type: Number, required: true},
    mustTakeCourses:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
});

const DepartmentSchema = new mongoose.Schema({
    name:{type: String, required: true},
    code:{type: String, required: false},
    description:{type: String, required: false},
    courses:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
    electiveGroups:[ElectiveSchema],
    lists:[{type: mongoose.Schema.Types.ObjectId , ref: "List", required: false}],
    coordinators:[{type: mongoose.Schema.Types.ObjectId , ref: "Professor", required: false}],
    links:[{type: String, required: false}],
});

module.exports = mongoose.model('Department',DepartmentSchema);