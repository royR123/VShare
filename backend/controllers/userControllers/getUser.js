const User = require("../../models/User");

const getUser = async (req,res) =>{
    try {
        console.log("in set user controller");
        const user = await User.findOne({userId : req.params.userId});
        res.status(200).json({name : user.name , userId : user.userId
             , email : user.email , img : user.img , subscribers : user.subscribers  });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getUser;