const router = require('express').Router();
const Course = require('../models/Course');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');

//Create Course POST
router.post("/", async (req,res) => {
    const newCourse = new Course({
        name:req.body.name,
        code:req.body.code,
        semster:req.body.semster,
        creditHours:req.body.creditHours,
        description:req.body.description,
        preReq:req.body.preReq,
        professor:req.body.professor,
        links:req.body.links,
    });

    try{
        const course = await newCourse.save();
        const professors = newCourse.professor;
        for(const professor of professors)
        {
            await Professor.findByIdAndUpdate(professor,{$addToSet: {courses: course.id}})
        }
        res.status(200).send(course);

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
        const course = await Course.findById(req.params.id);
        res.status(200).send(course);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send(error);
    }
    
});
//Update Course PUT

//DELETE Course

module.exports = router;