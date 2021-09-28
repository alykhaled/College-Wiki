const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const dotenv    = require('dotenv');
const courseRoute = require('./routes/course');
const professorRoute = require('./routes/professor');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected")).catch(err => console.log(err));

app.use(express.json());
app.use("/api/course",courseRoute);
app.use("/api/professor",professorRoute);

app.get("/",(req,res) => {
    res.send("Working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
})