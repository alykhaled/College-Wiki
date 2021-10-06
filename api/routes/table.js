const router = require('express').Router();
const Course = require('../models/Course');
const Table = require('../models/Table');
const mongoose = require('mongoose');
const verify   = require('../verifyToken');
//Create Course POST
router.post("/",verify, async (req,res) => {
    const newTable = new Table({
        name:req.body.name,
        courses:req.body.courses,
    });

    try{

        const table = await newTable.save();
        res.status(200).send(table);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//ADD course to List (PUT)
router.put("/:id/course", async (req,res) => {
    try{
        const table = await Table.findByIdAndUpdate(req.params.id,{$addToSet:{courses:req.body.course}});
        res.status(200).send(table);
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

//GET Course
router.get("/:id" ,async (req,res) => {
    try 
    {
        const table = await Table.findById(req.params.id).populate("courses.course");
        res.status(200).send(table);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send(error);
    }
    
});

//GET All courses
// router.get("/" ,async (req,res) => {
//     const queryCode = req.query.code;
//     if(queryCode !== undefined)
//     {
//         console.log(queryCode);
//         try 
//         {
//             const courses = await Course.findOne({code: queryCode.toUpperCase()}).populate("preReq");
//             res.status(200).send(courses);
//         } 
//         catch (error) 
//         {
//             console.log(error);
//             res.status(500).send(error);
//         }
//     }
//     else{
//         try 
//         {
//             const courses = await Course.find().populate("professor","-courses");
//             res.status(200).send(courses);
//         } 
//         catch (error) 
//         {
//             console.log(error);
//             res.status(500).send(error);
//         }
//     }
// });


module.exports = router;