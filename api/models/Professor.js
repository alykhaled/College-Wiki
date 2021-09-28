const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
    name:{type: String, required: true},
    image:{type: String, required: false},
    bio:{type: String, required: false},
    courses:[{type: mongoose.Schema.Types.ObjectId, ref: "Course", required: false}],
    links:[{type: String, required: false}],
    email:{type: String, required: false},
});

module.exports = mongoose.model('Professor',ProfessorSchema);