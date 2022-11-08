const express = require('express');
const User = require('../../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const signUp = async (req,res) => {
    try{
        console.log("in signup ");
        // const { name , email , password } = req.body;
        console.log(req.body);
        const userId = uuidv4();
        const salt = bcrypt.genSaltSync(10);
        const usernameExist = await User.findOne({name : req.body.name});
        // console.log(usernameExist);
        const useremailExist = await User.findOne({email : req.body.email});
        if(usernameExist){
            console.log(usernameExist.name);
            console.log("user exists");
            res.send("user exists");
            return;
        }else if(useremailExist){
            console.log("email user exist");
            return res.send("user exists");
        }else{
            console.log("in final");
            const hashed_password = bcrypt.hashSync(req.body.password,salt);
    
            const newUser = new User({userId : userId, name : req.body.name , email : req.body.email , password : hashed_password});
    
            await newUser.save();
    
            const token = jwt.sign({id : newUser.userId},require('../../SecretKey'));
            const {password,...others} = newUser._doc;
            res.cookie("token",token,{
                httpOnly:true , maxAge : 1
            }).status(200).json({...others , token : token}); 
            console.log("here");
        }
    }catch(error){
        console.log(error);
    }
};

module.exports = signUp;