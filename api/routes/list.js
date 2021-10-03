const router = require('express').Router();
const Course = require('../models/Course');
const Department = require('../models/Department');
const List = require('../models/List');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');
const verify   = require('../verifyToken');

//Create List (POST)
router.post("/",verify, async (req,res) => {
    const newList = new List({
        name:req.body.name,
        department:req.body.department,
        description:req.body.description,
        courses:req.body.courses,
    });

    try{
        const templist = await List.find({name:req.body.name});
        if(templist)
        {
            res.status(200).send("List Is Already created!");
        }
        const list = await newList.save();
        await Department.findOneAndUpdate({code:list.department},{$addToSet:{lists:list.id}});
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//GET List
router.get("/:id", async (req,res) => {
    try{
        const list = await List.findById(req.params.id).populate('courses');
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//DELETE List
router.delete("/:id",verify, async (req,res) => {
    try{
        await List.findByIdAndDelete(req.params.id);
        res.status(200).send("The list has been deleted");
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//UPDATE List
router.put("/:id", verify,async (req,res) => {
    try{
        const list = await List.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//ADD course to List (PUT)
router.put("/:id/course", async (req,res) => {
    try{
        const list = await List.findByIdAndUpdate(req.params.id,{$addToSet:{courses:req.body.course}});
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

//Remove course from List (PUT)
router.put("/:id/deletecourse", async (req,res) => {
    try{
        const list = await List.findByIdAndUpdate(req.params.id,{$pull:{courses:req.body.course}});
        res.status(200).send(list);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router; 