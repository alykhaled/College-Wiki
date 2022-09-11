const courseMapRouter = require("express").Router();
const courseMapService = require("../services/courseMap");
const verify = require('../verifyToken');



courseMapRouter.post("/", verify, courseMapService.createCourseMap, async (req, res) => {
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

courseMapRouter.get("/:id", verify, courseMapService.getCourseMap, async (req, res) => {
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

courseMapRouter.get("/", verify, courseMapService.getAllCourseMaps, async (req, res) => {
    const courseMapsResponse = req.courseMaps.map(courseMap => {
        return {
            id: courseMap._id,
            name: courseMap.name,
            user: courseMap.user ? courseMap.user.username : null,
            program: courseMap.program.code,
            semesters: courseMap.semesters,
            credits: courseMap.credits,
            }
    });
    
    res.status(200).send({message: "Course maps found", courseMaps: courseMapsResponse});
});

courseMapRouter.post("/:id/semesters", verify, courseMapService.getCourseMap, courseMapService.addSemester, async (req, res) => {
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

courseMapRouter.get("/:id/semesters/:semesterId", verify, courseMapService.getCourseMap, courseMapService.getSemester, async (req, res) => {
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
    
courseMapRouter.post("/:id/semesters/:semesterId/courses/:courseCode", verify, courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.addCourseToSemester, async (req, res) => {
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

courseMapRouter.delete("/:id/semesters/:semesterId/courses/:courseCode", verify, courseMapService.getCourseMap, courseMapService.getSemester,
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

courseMapRouter.get("/:id/semesters/:semesterId/available-courses", verify, courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.getAvailableCourses);

courseMapRouter.get("/:id/semesters/:semesterId/courses/:courseCode/left-prereqs", verify, courseMapService.getCourseMap, courseMapService.getSemester, courseMapService.getLeftPreReqs);


module.exports = courseMapRouter;