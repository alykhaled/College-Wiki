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
        coursesCompleted: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        coursesInProgress: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
        
    }
);

module.exports = mongoose.model('User', UserScheme);