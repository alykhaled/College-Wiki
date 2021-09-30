const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name:{type: String, required: true},
    code:{type: String, required: false},
    description:{type: String, required: false},
    courses:[{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false}],
    lists:[{type: mongoose.Schema.Types.ObjectId , ref: "List", required: false}],
    coordinators:[{type: mongoose.Schema.Types.ObjectId , ref: "Professor", required: false}],
    links:[{type: String, required: false}],
});

module.exports = mongoose.model('Department',DepartmentSchema);