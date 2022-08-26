const mongoose = require('mongoose');

const getAllCourses = async (departmentCode) => {
    const courses = await mongoose.model('Course').find({department: departmentCode});
    if (courses.length == 0) {
        return null;
    }
    return courses;
}


const createCourseMap = async (id, name, departmentCode) => {
    let courses = await getAllCourses(departmentCode);
    if (courses == null) {
        return null;
    }
    courses.forEach(course => {
        course.outDegree = course.preReq.length;
        course.isTaken = false;
    })
    const courseMap = {
        id: id,
        name: name,
        program: departmentCode,
        courses: courses,
        AvailableToTakeCourses: courses.filter(course => course.preReq.length === 0),
        takenCourses: [],
        takenCredits: 0
    }    
    return courseMap;
}

const getCourseMap = async(req, res, next) => {
    req.id = req.params.id;
    if (req.session.courseMap == null) {
        res.status(404).send("No course maps found for this session");
        return;
    }
    req.courseMap = req.session.courseMap.find(courseMap => courseMap.id == req.id);
    if (req.courseMap == null) {
        res.status(404).send("No course map found with this id");
        return;
    }
    next();
}



const takeCourse = (courseCode, courseMap) => {
    const course = courseMap.courses.find(course => course.code === courseCode);
    if (!course && course.isTaken && course.outDegree !== 0) {
        return;
    }
    course.isTaken = true;
    courseMap.takenCourses.push(course);
    courseMap.takenCredits += course.creditHours;
    courseMap.AvailableToTakeCourses.splice(courseMap.AvailableToTakeCourses.indexOf(course), 1);
    if (course.preReqRev) {
        course.preReqRev.forEach(preReq => {
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
    if (!course && !course.isTaken && course.outDegree !== 0) {
        return;
    }
    course.isTaken = false;
    courseMap.takenCourses.splice(courseMap.takenCourses.indexOf(course), 1);
    courseMap.takenCredits -= course.creditHours;
    courseMap.AvailableToTakeCourses.push(course);
    if (course.preReqRev) {
        course.preReqRev.forEach(preReq => {
            if (preReq.outDegree === 0) {
                courseMap.AvailableToTakeCourses.splice(courseMap.AvailableToTakeCourses.indexOf(preReq), 1);
            }
            preReq.outDegree++;
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
    takeCourse,
    dropCourse,
    getAvailableToTakeCourses,
    getTakenCourses,
    getTakenCredits,
    getLeftPreReq
}

