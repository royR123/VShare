const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = require('../SecretKey');
const mongoose = require('mongoose');
const verifyUser = async (req,res,next) => {
    let token ;
    if(req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')){
        try {
            token = req.headers.authorisation.split(' ')[1];
            console.log('in here');
            console.log(token);
            const decoded = jwt.verify(token,secretKey);
            console.log(decoded);
            if(!decoded){
                return res.status(403).send('tokens are expired');
            }
            req.decodedUserId = decoded.id;
            next();
        } catch (error) {
            console.log("here it is")
            res.status(202).json(error);
        }
    }else{
        res.status(401).json({message : "Don't have the access token"});
    }

}

module.exports =  { verifyUser };