const mongoose = require('mongoose');
const CourseMap = require('../models/CourseMap');
const Course = require('../models/Course');
const utils = require('../utils/CourseMap');


const createCourseMap = async (req, res, next) => {
    
    req.courseMapName = req.query.name || "Course Map";

    req.courseMapProgram = await mongoose.model('Department').findOne({code: req.query.program}).populate("courses");
    if (req.courseMapProgram == null) {
        return res.status(404).json({message: "Program not found"});
    }
    if (!req.courseMapProgram.courses || req.courseMapProgram.courses.length == 0) {
        return res.status(404).json({message: "No courses found for this program"});
    }

    req.courseMap = new CourseMap({
        name: req.courseMapName,
        user: req.user._id,
        program: req.courseMapProgram,
        semestersOrder: [],
        courses: req.courseMapProgram.courses.map(course => {
            return {
                course: course,
                semestersOrder: [],
                outDegree: course.preReq.length,
            }
        }),
        credits: 0,
        electiveGroups: req.courseMapProgram.electiveGroups.map(elective => {
            return {
                group: elective.group,
                coursesTaken: [],
                creditHoursTaken: 0,
                mustTakeCoursesLeft: elective.mustTakeCourses,
            }
        }),
    });

    req.courseMap.save();
    next();

}

const getCourseMap = async (req, res, next) => {
    req.id = req.params.id;

    req.courseMap = await CourseMap.findById(req.id).populate("program");
    if (req.courseMap == null) {
        return res.status(404).json({message: "Course map not found"});
    }
    if (req.courseMap.user.toString() != req.user._id.toString()) {
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
}

const getAllCourseMaps = async (req, res, next) => {
    req.courseMaps = await CourseMap.find({user: req.user._id}).populate("program");
    next();
}

const addSemester = async (req, res, next) => {
    if (!req.query.type) {
        res.status(400).send("No semester type provided");
        return;
    }
    req.semesterType = req.query.type;
    const semester = {
        type: req.semesterType,
        order: req.courseMap.semesters.length+1,
        courses: [],
        credits: 0,
        maxCredits: 21,
    }
    req.courseMap.semesters.push(semester);
    req.courseMap.save();
    next();
}

const getSemester = async (req, res, next) => {
    req.semesterId = req.params.semesterId;
    req.semester = req.courseMap.semesters.find(semester => semester.order == req.semesterId);
    if (req.semester == null) {
        res.status(404).send("No semester found with this id");
        return;
    }
    next();
}

const addCourseToSemester = async (req, res, next) => {
    req.courseCode = req.params.courseCode;
    req.course = req.courseMap.courses.find(course => course.course.code == req.courseCode);
    if (req.course == null) {
        res.status(404).send("No course found in the course map with this code");
        return;
    }

    if (utils.isCourseAvailable(req.course, req.semester, req.courseMap)) {
        req.semester.courses.push(req.course);
        req.course.semestersOrder.push(req.semester.order);
        req.course.course.preReqReverse.forEach(preReqId => {
            const preReq = req.courseMap.courses.find(course => course.course._id == preReqId.toString());
            if (preReq) {
                preReq.outDegree--;
            }
        });


        req.semester.credits += req.course.course.creditHours;
        req.courseMap.credits += req.course.course.creditHours;

        if (req.course.course.group.includes("elective")) {
            utils.addElectiveCourse(req.course, req.semester, req.courseMap);
        }

        req.courseMap.save();
        next();
    } else {
        return res.status(400).send({message: "Course not available in this semester"});
    }
    
}

const removeCourseFromSemester = async (req, res, next) => {
    req.courseCode = req.params.courseCode;
    req.course = req.semester.courses.find(course => course.course.code == req.courseCode);
    if (!req.course) {
        res.status(404).send("No course found in the semester with this code");
        return;
    }
    req.course = req.courseMap.courses.find(course => course.course.code == req.courseCode);
    utils.removeCourseFromSemester(req.course, req.semester, req.courseMap);
    req.courseMap.save();
    next();

}

const getAvailableCourses = async (req, res, next) => {
    let availableCourses = req.courseMap.courses.filter(course => { return course.outDegree == 0 });
    req.availableCourses = [];
    req.retakableCourses = [];
    availableCourses.forEach(course => {
        console.log("checking course: ", course.course.code);
        if (utils.isCourseAvailable(course, req.semester, req.courseMap)) {
            if (course.semestersOrder.length > 0) {
                req.retakableCourses.push(course);
            } else {
                req.availableCourses.push(course);
            }
        } else {
            console.log("course is not available");
        }
    });
    res.status(200).send({message: "Available courses", availableCourses: req.availableCourses, retakableCourses: req.retakableCourses});

}

const getLeftPreReqs = async (req, res, next) => {
    req.courseCode = req.params.courseCode;
    req.course = req.courseMap.courses.find(course => course.course.code == req.courseCode);
    req.leftPreReq = utils.getLeftPreReq(req.course, req.semester, req.courseMap);
    res.status(200).send({leftPreReq: req.leftPreReq});
}


module.exports = {
    createCourseMap,
    getCourseMap,
    getAllCourseMaps,
    addSemester,
    getSemester,
    addCourseToSemester,
    removeCourseFromSemester,
    getAvailableCourses,
    getLeftPreReqs
}