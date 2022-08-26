const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");

let courseMapCounter = 0;

courseMapRouter.get("/", async (req, res) => {
    if (req.session.courseMap){
        res.send(req.session.courseMap);
    }
    else {
        res.status(404).send("No course maps found");
    }
});

courseMapRouter.post("/", async (req, res) => {
    const id = courseMapCounter++;
    const name = req.query.name || "Course Map";
    const departmentCode = req.query.departmentCode;
    courseMap = await courseMapService.createCourseMap(id, name, departmentCode);
    if (courseMap == null) {
        res.status(404).send("No courses found for this department");
    }
    req.session.courseMap = req.session.courseMap || [];
    req.session.courseMap.push(courseMap);
    res.status(200).send("Course map created");
});

courseMapRouter.get("/:id/AvailableToTakeCourses", courseMapService.getCourseMap, async (req, res) => {

    res.send(courseMapService.getAvailableToTakeCourses(courseMap));

});

courseMapRouter.get("/:id/takenCourses", courseMapService.getCourseMap, async (req, res) => {
    
    res.send(courseMapService.getTakenCourses(courseMap));

});

courseMapRouter.get("/:id/takenCredits", courseMapService.getCourseMap, async (req, res) => {

    res.status(200).json(courseMapService.getTakenCredits(courseMap));

});

courseMapRouter.post("/:id/takeCourse", courseMapService.getCourseMap, async (req, res) => {
    const courseCode = req.query.courseCode;
    courseMapService.takeCourse(courseCode, courseMap);

    res.send(courseMap);
});

courseMapRouter.post("/:id/dropCourse", courseMapService.getCourseMap, async (req, res) => {
    const courseCode = req.query.courseCode;
    courseMapService.dropCourse(courseCode, courseMap);
    res.send(courseMap);
});


module.exports = courseMapRouter;