const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name:{type: String, required: true},
    department:{type: String, required: false},
    description:{type: String, required: false},
    lists:[{type: mongoose.Schema.Types.ObjectId , ref: "List", required: false}],
});

module.exports = mongoose.model('List',ListSchema);