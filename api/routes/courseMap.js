const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");



courseMapRouter.get("/:id", courseMapService.getCourseMap, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Course map found", courseMap: courseMapResponse});
});

courseMapRouter.post("/", courseMapService.createCourseMap, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Course map created", courseMap: courseMapResponse});
});

courseMapRouter.post("/:id/semesters", courseMapService.getCourseMap, courseMapService.addSemester, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Semester added", courseMap: courseMapResponse});
});

courseMapRouter.get("/:id/semesters/:semesterId", courseMapService.getCourseMap, courseMapService.getSemester, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Semester found", courseMap: courseMapResponse});
});
    
courseMapRouter.post("/:id/semesters/:semesterId/courses/:courseCode", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.addCourseToSemester, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Course added to semester", courseMap: courseMapResponse});
});

courseMapRouter.delete("/:id/semesters/:semesterId/courses/:courseCode", courseMapService.getCourseMap, courseMapService.getSemester,
                                                                                courseMapService.removeCourseFromSemester, async (req, res) => {
    const courseMapResponse = {
        id: req.courseMap._id,
        name: req.courseMap.name,
        user: req.courseMap.user ? req.courseMap.user.username : null,
        program: req.courseMap.program.code,
        semesters: req.courseMap.semesters,
        credits: req.courseMap.credits,
    }
    res.status(200).send({message: "Course removed from semester", courseMap: courseMapResponse});
});

courseMapRouter.get("/:id/semesters/:semesterId/available-courses", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.getAvailableCourses);

courseMapRouter.get("/:id/semesters/:semesterId/courses/:courseCode/left-prereqs", courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.getLeftPreReqs);


module.exports = courseMapRouter;