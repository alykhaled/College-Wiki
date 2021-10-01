const router = require('express').Router();
const Course = require('../models/Course');
const Department = require('../models/Department');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');
const { verify } = require('jsonwebtoken');

//Create Department (POST)
router.post("/",verify, async (req,res) => {
    const newDepartment = new Department({
        name:req.body.name,
        code:req.body.code,
        description:req.body.description,
        courses:req.body.courses,
        coordinators:req.body.coordinators,
        links:req.body.links,
    });

    try{
        const department = await newDepartment.save();
        res.status(200).send(department);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//GET Department's List
router.get("/:code/lists",verify, async (req,res) => {
    try{
        const list = await Department.findOne({code:req.params.code.toUpperCase()}).populate('lists').populate({
            path:"lists",
            populate:{
                path:"courses",
                model:"Course",
             }
        }).populate({
            path:"lists",
            populate:{
                path:"courses",
                populate:{
                    path:"preReq",
                    model:"Course",
                }
            }
        }).populate({
            path:"lists",
            populate:{
                path:"courses",
                populate:{
                    path:"professor",
                    model:"Professor",
                }
            }
        }).select('lists');
        // await list.populate({
        //     path:"lists",
        //     populate:{
        //         path:"courses.professor",
        //         model:"Professor",
        //      }
        // })
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;