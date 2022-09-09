const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");



courseMapRouter.get("/:id", courseMapService.getCourseMap, async (req, res) => {
    res.status(200).send(req.courseMap);
});

courseMapRouter.post("/", courseMapService.createCourseMap, async (req, res) => {
    res.status(200).send(req.courseMap);
});

courseMapRouter.post("/:id/semesters", courseMapService.getCourseMap, courseMapService.addSemester, async (req, res) => {
    res.status(200).send(req.courseMap);
});

courseMapRouter.get("/:id/semesters/:semesterId", courseMapService.getCourseMap, courseMapService.getSemester, async (req, res) => {
    res.status(200).send(req.semester);
});
    
courseMapRouter.post("/:id/semesters/:semesterId/courses/:courseCode", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.addCourseToSemester);

courseMapRouter.delete("/:id/semesters/:semesterId/courses/:courseCode", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.removeCourseFromSemester);

courseMapRouter.get("/:id/semesters/:semesterId/available-courses", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.getAvailableCourses);


module.exports = courseMapRouter;