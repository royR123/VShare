const User = require('../../models/User');

const deleteUser = async (req,res) => {
    if(req.params.userId !== req.decodedUserId){
        res.status(401).send('Not authorised');
        return;
    }
    try {
        await User.findOneAndDelete({userId : req.params.userId});

        res.send("user deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Sorry , its server error");
    }
}

module.exports = deleteUser;