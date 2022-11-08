const User = require("../../models/User");


const unsubscribeUser = async (req,res) => {
    try {
        console.log("in unsub");
        if(req.decodedUserId !== req.params.userId){
            res.status(401).send("you are not authorised");
            return;
        }
        await User.findOneAndUpdate({userId : req.params.userId},{
            $pull:{subscriberedUsers : req.query.subUserId},
        })
        const user = await User.findOneAndUpdate({userId : req.params.userId},{
            $inc : {subscribers : -1},
        })
        console.log(user);
        res.status(200).send("unsubscription done");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = unsubscribeUser;