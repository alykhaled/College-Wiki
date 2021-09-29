const router = require('express').Router();
const Course = require('../models/Course');
const Department = require('../models/Department');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');

//Create Department (POST)
router.post("/", async (req,res) => {
    const newDepartment = new Course({
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

module.exports = router;