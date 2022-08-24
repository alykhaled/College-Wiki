const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");

let courseMap = null;


courseMapRouter.get("/", async (req, res) => {
    const departmentCode = req.query.departmentCode;
    courseMap = await courseMapService.createCourseMap(departmentCode);
    res.send(courseMap);
});

courseMapRouter.get("/AvailableToTakeCourses", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.send(courseMapService.getAvailableToTakeCourses(courseMap));
});

courseMapRouter.get("/takenCourses", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.send(courseMapService.getTakenCourses(courseMap));
});

courseMapRouter.get("/takenCredits", async (req, res) => {
    const courseMap = req.body.courseMap;
    res.status(200).json(courseMapService.getTakenCredits(courseMap));
});

courseMapRouter.post("/takeCourse", async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseMap = req.body.courseMap;
    courseMapService.takeCourse(courseCode, courseMap);
    res.send(courseMap);
});

courseMapRouter.post("/dropCourse", async (req, res) => {
    const courseCode = req.body.courseCode;
    const courseMap = req.body.courseMap;
    courseMapService.dropCourse(courseCode, courseMap);
    res.send(courseMap);
});


module.exports = courseMapRouter;