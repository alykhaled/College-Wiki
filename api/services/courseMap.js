const mongoose = require('mongoose');

const getAllCourses = async (departmentCode) => {
    const courses = await mongoose.model('Course').find({department: departmentCode});
    if (courses.length == 0) {
        return null;
    }
    return courses;
}


const createCourseMap = async (departmentCode) => {
    let courses = await getAllCourses(departmentCode);
    if (courses == null) {
        return null;
    }
    courses.forEach(course => {
        course.outDegree = course.preReq.length;
        course.isTaken = false;
    })
    const courseMap = {
        user: "username",
        program: departmentCode,
        courses: new Map( courses.map(course => [course.code, course])),
        AvailableToTakeCourses: courses.filter(course => course.preReq.length === 0),
        takenCourses: [],
        takenCredits: 0
    }
    return courseMap;
}



const takeCourse = (courseCode, courseMap) => {
    const course = courseMap.courses.get(courseCode);
    if (!course && course.isTaken && course.outDegree !== 0) {
        return;
    }
    course.isTaken = true;
    courseMap.takenCourses.push(course);
    courseMap.takenCredits += course.credits;
    course.preReqRev.forEach(preReq => {
        preReq.outDegree--;
        if (preReq.outDegree === 0) {
            courseMap.AvailableToTakeCourses.push(preReq);
        }
    });
}

const dropCourse = (courseCode, courseMap) => {
    const course = courseMap.courses.get(courseCode);
    if (!course && !course.isTaken && course.outDegree !== 0) {
        return;
    }
    course.isTaken = false;
    courseMap.takenCourses.splice(courseMap.takenCourses.indexOf(course), 1);
    courseMap.takenCredits -= course.credits;
    courseMap.AvailableToTakeCourses.push(course);
    course.preReqRev.forEach(preReq => {
        if (preReq.outDegree === 0) {
            courseMap.AvailableToTakeCourses.splice(courseMap.AvailableToTakeCourses.indexOf(preReq), 1);
        }
        preReq.outDegree++;
    });
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
    const course = courseMap.courses.get(courseCode);
    return course.preReq.filter(preReq => !preReq.isTaken);
}


module.exports = {
    createCourseMap,
    takeCourse,
    dropCourse,
    getAvailableToTakeCourses,
    getTakenCourses,
    getTakenCredits,
    getLeftPreReq
}

