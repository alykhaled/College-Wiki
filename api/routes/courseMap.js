const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");



courseMapRouter.get("/", async (req, res) => {
    if (req.session.courseMaps){
        res.send(req.session.courseMaps);
    }
    else {
        res.status(404).send("No course maps found");
    }
});

courseMapRouter.post("/", courseMapService.createCourseMap, async (req, res) => {
    if (req.courseMap) {
        req.session.courseMaps = req.session.courseMaps || [];
        req.session.courseMaps.push(courseMap);
        res.status(200).send("Course map created");
    }
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