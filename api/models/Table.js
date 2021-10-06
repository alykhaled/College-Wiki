const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    name:{type: String, required: true},
    courses:[{
        time:{type: String, required: false},
        day:{type: String, required: false},
        course:{type: mongoose.Schema.Types.ObjectId , ref: "Course", required: false},
        location:{type: String, required: false},
        type:{type: String, required: false}
    }],
});

module.exports = mongoose.model('Table',TableSchema);