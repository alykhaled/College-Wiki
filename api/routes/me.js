const router = require('express').Router();
const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');
const verify   = require('../verifyToken');

//Create Course POST
router.put("/course/:id",verify, async (req,res) => {
    try{
        const course = await Course.findById(req.params.id);
        const user = await User.findByIdAndUpdate(req.user._id, {$push: {coursesCompleted: course}}, {new: true});
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//Create Course POST
router.put("/inprogress/:id",verify, async (req,res) => {
    try{
        const course = await Course.findById(req.params.id);
        const user = await User.findByIdAndUpdate(req.user._id, {$push: {coursesInProgress: course}}, {new: true});
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

// //UPDATE Course
// router.put("/:id", verify, async (req,res) => {
//     try{
//         const list = await Course.findByIdAndUpdate(req.params.id,{$set:req.body}, {new: true});
//         res.status(200).send(list);
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send(error);
//     }
// });

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

//GET All courses
router.get("/" ,verify,async (req,res) => {
    try 
    {
        console.log(req.user);
        const user = await User.findById(req.user._id).populate("coursesCompleted").populate("coursesInProgress").exec();
        res.status(200).send(user);
    } 
    catch (error) 
    {
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