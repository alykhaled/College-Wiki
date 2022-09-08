const mongoose = require('mongoose');
const CourseMap = require('../models/CourseMap');
const Semester = require('../models/Semester');
const CourseMapCourse = require('../models/CourseMapCourse');
const Course = require('../models/Course');
const utils = require('../utils/CourseMap');


const createCourseMap = async (req, res, next) => {
    
    req.courseMapName = req.query.name || "Course Map";

    req.courseMapProgram = await mongoose.model('Department').findOne({code: req.query.program});
    if (req.courseMapProgram == null) {
        return res.status(404).json({message: "Program not found"});
    }

    if (!req.courseMapProgram.courses || req.courseMapProgram.courses.length == 0) {
        return res.status(404).json({message: "No courses found for this program"});
    }
    req.courseMapCourses = [];
    req.courseMapProgram.courses.forEach(async course => {
        let newCourseMapCourse = new CourseMapCourse({
            course: course._id, 
            semester: [],
        }).save((err, courseMapCourse) => {
            if (err) {
                return res.status(500).json({message: "Error creating course map course"});
            }
            req.courseMapCourses.push(courseMapCourse);
            if (req.courseMapCourses.length == req.courseMapProgram.courses.length) {
                req.courseMap = new CourseMap({
                    name: req.courseMapName,
                    program: req.courseMapProgram._id,
                    courses: req.courseMapCourses,
                }).save((err, courseMap) => {
                    if (err) {
                        return res.status(500).json({message: "Error creating course map"});
                    }
                    CourseMap.populate(courseMap, {path: "program"}, (err, courseMap) => {
                        if (err) {
                            return res.status(500).json({message: "Error populating course map"});
                        }
                        return res.status(200).json({message: "Course map created", courseMap: courseMap});
                    });
                });
            }
        });
    });


    
}

const getCourseMap = async(req, res, next) => {
    req.id = req.params.id;

    req.courseMap = await CourseMap.findById(req.id).populate("program semesters").exec(function(err, courseMap) {
        if (err) {
            return res.status(500).json({message: "Error finding course map"});
        }
        if (courseMap == null) {
            return res.status(404).json({message: "Course map not found"});
        }
        courseMap.populate("semesters.course", (err, courseMap) => {
            if (err) {
                return res.status(500).json({message: "Error populating course map"});
            }
        
            req.courseMap = courseMap;
            next();
        });
    });
    
}

const addSemester = async (req, res, next) => {
    if (!req.query.type) {
        res.status(400).send("No semester type provided");
        return;
    }
    req.semesterType = req.query.type;
    const semester = new Semester({
        type: req.semesterType,
        courses: [],
        credits: 0,
        maxCredits: 21,
    }).save((err, semester) => {
        if (err) {
            return res.status(500).json({message: "Error creating semester"});
        }
        req.courseMap.semesters.push(semester);
        req.courseMap.save((err, courseMap) => {
            if (err) {
                return res.status(500).json({message: "Error saving course map"});
            }
            return res.status(200).json({message: "Semester added", courseMap: courseMap});

        });
    });
    
}

const getSemester = async (req, res, next) => {
    req.semesterId = req.params.semesterId;
    req.semester = req.courseMap.semesters.find(semester => semester._id == req.semesterId);
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

const getAvailableCourses = async (req, res, next) => {
    req.availableCourses = req.courseMap.getAvailableCourses(req.semester);
    res.status(200).send(req.availableCourses);
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
    getAvailableCourses,
    getLeftPreReq
}

