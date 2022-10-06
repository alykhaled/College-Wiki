const router = require('express').Router();
const Course = require('../models/Course');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');
const verify   = require('../verifyToken');
//Create Course POST
router.post("/",verify, async (req,res) => {
    const newCourse = new Course({
        name:req.body.name,
        code:req.body.code,
        semester:req.body.semester,
        creditHours:req.body.creditHours,
        description:req.body.description,
        type:req.body.type,
        preReq:req.body.preReq,
        professor:req.body.professor,
        links:req.body.links,
    });

    try{
        const tempcourse = await Course.find({code:req.body.code});
        if(tempcourse.length !== 0)
        {
            res.status(200).send("Course Is Already created!");
        }
        else{
            const course = await newCourse.save();
            const professors = newCourse.professor;
            for(const professor of professors)
            {
                await Professor.findByIdAndUpdate(professor,{$addToSet: {courses: course.id}})
            }
            res.status(200).send(course);    
        }

    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//UPDATE Course
router.put("/:id", verify, async (req,res) => {
    try{
        const list = await Course.findByIdAndUpdate(req.params.id,{$set:req.body}, {new: true});
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//Search For a course by code
router.get("/search/" ,async (req,res) => {
    const query = req.query.q;
    const type = req.query.type;
    console.log(query);
    if(query !== "")
    {
        try 
        {
            // const courses = await Course.find({code: {$regex: new RegExp(query.toUpperCase())}}).populate("preReq").exec();
            const courses = await Course.aggregate([
                {
                    "$search":{
                        "index": "codeindex",
                        "autocomplete":{
                            "query": query,
                            "path": `${type}`,
                        }
                    }
               }
            ]).exec(function(err, courses) {
                // Don't forget your error handling
                // The callback with your transactions
                // Assuming you are having a Tag model
                Course.populate(courses, {path: 'preReq'}, function(err, populatedTransactions) {
                    res.status(200).send(populatedTransactions);
                });
            });
            // res.status(200).send(courses);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

//GET Course
router.get("/:id" ,async (req,res) => {
    try 
    {
        const course = await Course.findById(req.params.id).populate("professor","-courses").populate({ path: 'preReq', select: 'name code' }).lean();
        // console.log(course);
        let dependentCourses = [];
        const courses = await Course.find().select("_id preReq name code").populate({ path: 'preReq', select: '_id name code' });
        // console.log(courses[0]);
        courses.forEach(async (course, index) => { 
            course.preReq.forEach(async (preReq, index) => {
                // console.log(preReq._id);
                if(preReq._id.equals(req.params.id)) {
                    course.preReq = undefined; 
                    dependentCourses.push(course);
                }
            });
        });
        
        console.log(dependentCourses);
        course["dependentCourses"] = dependentCourses;
        res.status(200).send(course);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send(error);
    }
    
});

//GET All courses
router.get("/" ,async (req,res) => {
    const queryCode = req.query.code;
    if(queryCode !== undefined)
    {
        console.log(queryCode);
        try 
        {
            const courses = await Course.findOne({code: queryCode.toUpperCase()}).populate("preReq");
            res.status(200).send(courses);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
    }
    else{
        try 
        {
            const courses = await Course.find().populate("professor","-courses");
            res.status(200).send(courses);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
    }
    
});

router.post("/:code/preReq/",verify, async (req,res) => {
    try{
        let course = await Course.findOne({code: req.params.code.toUpperCase()});
        const preReqs  = req.body.preReq;
        if (!course || !preReqs) {
            res.status(404).send("Course or PreReqs body not found");
        }
        else {
            preReqs.forEach(async (preReq, index) => {
                const preReqCourse = await Course.findOne({code: preReq.toUpperCase()});
                if(preReqCourse) {
                    course = await Course.findByIdAndUpdate(course.id,{$addToSet: {preReq: preReqCourse.id}});
                } else {
                    preReqs.splice(index,1);
                }
            });
            res.status(200).json({"Sucessfully added preReqs": preReqs});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:code/dependent", async (req,res) => {
    try{
        let course = await Course.findOne({code: req.params.code.toUpperCase()});
        if (!course) {
            res.status(404).send("Course not found");
        }
        let dependentCourses = [];
        const courses = await Course.find().select("preReq name code").populate({ path: 'preReq', select: 'name code' });
        courses.forEach(async (course, index) => { 
            course.preReq.forEach(async (preReq, index) => {
                if(preReq.code === req.params.code.toUpperCase()) {
                    course.preReq = undefined; 
                    console.log(course)
                    dependentCourses.push(course);
                }
            });
        });
        res.status(200).send(dependentCourses);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//GET All courses
// router.get("/?id" ,async (req,res) => {
//     try 
//     {
//         const courses = await Course.find().populate("professor","-courses");
//         res.status(200).send(courses);
//     } 
//     catch (error) 
//     {
//         console.log(error);
//         res.status(500).send(error);
//     }
    
// });
//Update Course PUT

//DELETE Course

module.exports = router;