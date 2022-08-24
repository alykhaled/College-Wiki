const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const dotenv    = require('dotenv');
const courseRoute = require('./routes/course');
const authRoute = require('./routes/auth');
const professorRoute = require('./routes/professor');
const departmentRoute = require('./routes/department');
const listRoute = require('./routes/list');
const tableRoute = require('./routes/table');
const meRoute = require('./routes/me');
const courseMapRoute = require('./routes/courseMap');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected")).catch(err => console.log(err));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
    next();
});
  
app.use(express.json());
app.use("/api/course",courseRoute);
app.use("/api/auth",authRoute);
app.use("/api/department",departmentRoute);
app.use("/api/list",listRoute);
app.use("/api/table",tableRoute);
app.use("/api/me",meRoute);
app.use("/api/courseMap",courseMapRoute);

app.get("/",(req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Working!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
})