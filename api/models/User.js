const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserScheme = new Schema(
    {
        username: String,  
        name: String, 
        email: String,  
        password: String,
        image: { type: String, default: "Date.now" },  
        department: { type: String, default: "HEM" },  
        isAdmin: { type: Boolean, default: false },  
    }
);

module.exports = mongoose.model('User', UserScheme);