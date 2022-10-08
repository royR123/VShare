const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const signUp = async (req,res) => {
    const { name , email , password } = req.body;
    console.log(req.body);
    const userId = uuidv4();
    const salt = bcrypt.genSaltSync(10);
    try{
        const usernameExist = await User.findOne({name : name});
        console.log(usernameExist);
        if(usernameExist){
            console.log(usernameExist.name);
            return res.send("user exists");
            
        }else{
            console.log("here but why?");
        }
        const useremailExist = await User.findOne({email : email});
        if(useremailExist){
            return res.send("user exists");
        }
        const hashed_password = bcrypt.hashSync(password,salt);

        const newUser = new User({userId : userId, name : name , email : email , password : hashed_password});

        await newUser.save();

        res.send(newUser);
        console.log("here");
    }catch(error){
        console.log(error);
    }
};

module.exports = signUp;