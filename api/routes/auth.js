const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

router.post("/register", async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        department: req.body.department,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() 
    });
    console.log(newUser);
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }

 });

 router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if(decrypted !== req.body.password){
            return res.status(401).json({msg: "Incorrect password"});
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);
        const {password, ...info} = user._doc;
        res.status(200).json({...info, token});
    } catch (error) {
        res.status(500).json(error);
    }

 });

module.exports = router;