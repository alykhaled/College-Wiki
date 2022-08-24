const courseMapRouter = require("express").Router();
const courseMap = require("../services/courseMap");

let myCourseMap = null;


courseMapRouter.get("/", async (req, res) => {
    const departmentCode = req.query.departmentCode;
    myCourseMap = await courseMap.createCourseMap(departmentCode);
    res.send(myCourseMap);
});

courseMapRouter.get("/AvailableToTakeCourses", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.send(courseMap.AvailableToTakeCourses);
});

courseMapRouter.get("/takenCourses", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.send(courseMap.takenCourses);
});

courseMapRouter.get("/takenCredits", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.send(courseMap.takenCredits);
});

courseMapRouter.post("/takeCourse", async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseMap = req.body.courseMap;
    courseMap.takeCourse(courseCode, courseMap);
    res.send(courseMap);
});

courseMapRouter.post("/dropCourse", async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseMap = req.body.courseMap;
    courseMap.dropCourse(courseCode, courseMap);
    res.send(courseMap);
});


module.exports = courseMapRouter;