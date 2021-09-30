const router = require('express').Router();
const Course = require('../models/Course');
const Department = require('../models/Department');
const List = require('../models/List');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');

//Create Department (POST)
router.post("/", async (req,res) => {
    const newList = new List({
        name:req.body.name,
        department:req.body.code,
        description:req.body.description,
        courses:req.body.courses,
    });

    try{
        const list = await newList.save();
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router; 