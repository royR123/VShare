const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const changePassword = async (req,res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        console.log("in change password");
        if(req.decodedUserId !== req.params.userId){
            return res.status(404).json("Wrong Credentials");
        }
        const user = await User.findOne({userId : req.decodedUserId});
        const isCorrect = await bcrypt.compare(req.query.oldPassword,user.password);
        console.log(user.password);
        console.log(req.query.oldPassword);
        console.log(isCorrect);
        if(!isCorrect){
            res.status(201).json("invalid credentials");
            return;
        }
        console.log("here");
        const hashed_password = bcrypt.hashSync(req.query.newPassword,salt);
        console.log(hashed_password);
        const updatedUser = await User.findOneAndUpdate({userId : req.decodedUserId},{
            $set:{password : hashed_password}
        },{new : true});
        console.log(updatedUser);
        res.status(200).json("Ok");
        
    } catch (error) {
        
    }
} 
module.exports = changePassword;