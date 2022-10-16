const User = require("../../models/User");


const subscribeUser = async (req,res) => {
    try {
        if(req.decodedUserId !== req.params.userId){
            res.status(401).send("you are not authorised");
            return;
        }
        await User.findOneAndUpdate({userId : req.params.userId},{
            $push:{subscribedUsers : req.query.subUserId},
        })
        await User.findOneAndUpdate({userId : req.params.userId},{
            $inc : {subscribers : 1},
        })
        res.status(200).send("subscription done");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = subscribeUser;