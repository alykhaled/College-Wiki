const mongoose = require('mongoose');
const {Course, Semester, CourseMap } = require('../utils/CourseMap');

let courseMapCounter = 0;

const getAllCourses = async (departmentCode) => {
    const courses = await mongoose.model('Course').find({department: departmentCode});
    if (courses.length == 0) {
        return null;
    }
    return courses;
}


const createCourseMap = async (req, res, next) => {
    req.courseMapId = courseMapCounter++;
    req.courseMapName = req.query.name || "Course Map";
    req.courseMapProgram = req.query.program || "CCE";

    let courses = await getAllCourses(req.courseMapProgram);
    if (courses == null) {
        res.status(404).send("No courses found for this department");
        return null;
    }
    let courseMap = new CourseMap(req.courseMapId, req.courseMapName, req.username, req.courseMapProgram);
    courses.forEach(course => {
        Course.createCourseFromCourseSchema(course);
        courseMap.addCourse(course);
    })
    req.courseMap = courseMap;
    next();
}

const getCourseMap = async(req, res, next) => {
    req.id = req.params.id;
    if (req.session.courseMaps == null) {
        res.status(404).send("No course maps found for this session");
        return;
    }
    req.courseMap = req.session.courseMaps.find(courseMap => courseMap.id == req.id);
    req.courseMap = CourseMap.loadCourseMapFromSessionStorage(req.courseMap);
    // console.log("Course map data at the router after loading: ", req.courseMap);
    if (req.courseMap == null) {
        res.status(404).send("No course map found with this id");
        return;
    }
    next();
}

const addSemester = async (req, res, next) => {
    if (!req.query.type) {
        res.status(400).send("No semester type provided");
        return;
    }
    req.semesterType = req.query.type;
    const semester = req.courseMap.createSemester(req.semesterType);
    req.session.courseMaps[req.courseMap.id] = req.courseMap;
    res.status(200).send(req.courseMap);
}

const getSemester = async (req, res, next) => {
    req.semesterId = req.params.semesterId;
    req.semester = req.courseMap.semesters.find(semester => semester.id == req.semesterId);
    if (req.semester == null) {
        res.status(404).send("No semester found with this id");
        return;
    }
    next();
}

const addCourseToSemester = async (req, res, next) => {
    req.courseCode = req.params.courseCode;
    req.course = req.courseMap.courses.find(course => course.code == req.courseCode);
    if (req.course == null) {
        res.status(404).send("No course found in the course map with this code");
        return;
    }
    try {
        req.courseMap.addCourseToSemester(req.course, req.semester);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
    req.session.courseMaps[req.courseMap.id] = req.courseMap;
    res.status(200).send(req.courseMap);
}

const removeCourseFromSemester = async (req, res, next) => {
    req.courseCode = req.params.courseCode;
    req.course = req.courseMap.courses.find(course => course.code == req.courseCode);
    if (req.course == null) {
        res.status(404).send("No course found in the course map with this code");
        return;
    }
    try {
        req.courseMap.removeCourseFromSemester(req.course, req.semester);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
    req.session.courseMaps[req.courseMap.id] = req.courseMap;
    res.status(200).send(req.courseMap);
}


const takeCourse = (courseCode, courseMap) => {
    const course = courseMap.courses.find(course => course.code === courseCode);
    if (!course || course.isTaken || course.outDegree !== 0) {
        return;
    }
    course.isTaken = true;
    courseMap.takenCourses.push(course);
    courseMap.takenCredits += course.creditHours;
    courseMap.AvailableToTakeCourses.splice(courseMap.AvailableToTakeCourses.indexOf(course), 1);
    if (course.preReqReverse) {
        course.preReqReverse.forEach(preReq => {
            preReq.outDegree--;
            if (preReq.outDegree === 0) {
                courseMap.AvailableToTakeCourses.push(preReq);
            }
        });
    }
    console.log(course);
}

const dropCourse = (courseCode, courseMap) => {
    const course = courseMap.courses.find(course => course.code === courseCode);
    if (!course || !course.isTaken || course.outDegree !== 0) {
        return;
    }
    course.isTaken = false;
    courseMap.takenCourses.splice(courseMap.takenCourses.indexOf(course), 1);
    courseMap.takenCredits -= course.creditHours;
    courseMap.AvailableToTakeCourses.push(course);
    if (course.preReqReverse) {
        course.preReqReverse.forEach(preReqRev => {
            if (preReqRev.outDegree === 0) {
                courseMap.AvailableToTakeCourses.splice(courseMap.AvailableToTakeCourses.indexOf(preReqRev), 1);
            }
            preReqRev.outDegree++;
        });
    }
}

const getAvailableToTakeCourses = (courseMap) => {
    return courseMap.AvailableToTakeCourses;
}

const getTakenCourses = (courseMap) => {
    return courseMap.takenCourses;
}

const getTakenCredits = (courseMap) => {
    return courseMap.takenCredits;
}

const getLeftPreReq = (courseCode, courseMap) => {
    const course = courseMap.courses.find(course => course.code === courseCode);
    return course.preReq.filter(preReq => !preReq.isTaken);
}


module.exports = {
    createCourseMap,
    getCourseMap,
    addSemester,
    getSemester,
    addCourseToSemester,
    removeCourseFromSemester,
    takeCourse,
    dropCourse,
    getAvailableToTakeCourses,
    getTakenCourses,
    getTakenCredits,
    getLeftPreReq
}

