const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async (req,res) => {
    console.log("now in login ")
    try {
        const user = await User.findOne({name : req.body.name});

        if(!user){
            return res.status(404).send('User not exists');
        }
        const isCorrect = await bcrypt.compare(req.body.password,user.password);

        if(!isCorrect){
            return res.status(404).send('Invalid Credentials');
        }
        const token = jwt.sign({id : user.userId},require('../../SecretKey'),{
            expiresIn:'60s'
        });
        const {password,...others} = user._doc;
        res.status(200).json({...others , token}); 
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = login;