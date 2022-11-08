const User = require("../../models/User");


const subscribeUser = async (req,res) => {
    try {
        console.log("in subscribe");
        if(req.decodedUserId !== req.params.userId){
            res.status(401).send("you are not authorised");
            return;
        }
        console.log(`sub user id is ${req.query.subUserId}`);
        await User.findOneAndUpdate({userId : req.params.userId},{
            $push:{subscriberedUsers : req.query.subUserId},
        })
        const user = await User.findOneAndUpdate({userId : req.params.userId},{
            $inc : {subscribers : 1},
        })
        console.log(user);
        res.status(200).send("subscription done");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = subscribeUser;