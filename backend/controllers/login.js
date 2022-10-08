const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async (req,res) => {
    console.log("now in login ")
    const { name  } = req.body;
    try {
        const user = await User.findOne({name : name});

        if(!user){
            return res.status(404).send('User not exists');
        }
        const isCorrect = await bcrypt.compare(req.body.password,user.password);

        if(!isCorrect){
            return res.status(404).send('Invalid Credentials');
        }
        const token = jwt.sign({id : user.userId},require('../SecretKey'));
        const {password,...others} = user._doc;
        res.cookie("token",token,{
            httpOnly:true
        }).status(200).send(others);
    } catch (error) {
        
    }
}

module.exports = login;