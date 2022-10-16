const User = require("../../models/User");

const getUser = async (req,res) =>{
    try {
        const user = await User.findOne({userId : req.params.userId});
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getUser;