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
        semster:req.body.semster,
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

//GET Course
router.get("/:id" ,async (req,res) => {
    try 
    {
        const course = await Course.findById(req.params.id).populate("professor","-courses");
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
    const query = req.query.search;
    if(query === undefined)
    {
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
    else{
        console.log(query);
        try 
        {
            const courses = await Course.find({code: {$regex: new RegExp(query.toUpperCase())}}).exec();
            res.status(200).send(courses);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
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