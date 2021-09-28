const router = require('express').Router();
const Course = require('../models/Course');
const Professor = require('../models/Professor');
const mongoose = require('mongoose');

//Create Professor POST
router.post("/", async (req,res) => {
    const newProfessor = new Professor({
        name:req.body.name,
        image:req.body.image,
        bio:req.body.bio,
        courses:req.body.courses,
        links:req.body.links,
        email:req.body.email,
    });

    try{
        const professor = await newProfessor.save();
        res.status(200).send(professor);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;