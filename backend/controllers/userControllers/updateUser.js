const User = require('../../models/User');

const updateUser = async (req,res) =>{
    try {
        console.log(req.decodedUserId);
        if(req.params.userId !== req.decodedUserId){
            res.status(401).send('Not authorised');
            return;
        }
        const updatedUser = await User.findOneAndUpdate({userId : req.params.userId},{
            $set:req.body,
        } ,
        {new : true}) 
        console.log(updatedUser);
        if(!updatedUser){
            res.status(400).send("user not exists");
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Sorry , its server error");
    }
}
module.exports = updateUser;