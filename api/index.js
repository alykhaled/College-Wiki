const express       = require('express');
const app           = express();
const mongoose      = require('mongoose');

mongoose.connect("").then(() => console.log("DB Connected")).catch(err => console.log(err));

app.get("/",(req,res) => {
    res.send("Working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
})