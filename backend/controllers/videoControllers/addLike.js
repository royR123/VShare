const Video = require("../../models/Video");

const addLike = async (req,res) => {
    console.log(req.params);
    try {
        await Video.findOneAndUpdate({videoId : req.params.videoId},{
            $addToSet:{likes : req.decodedUserId},
            $pull:{dislikes : req.decodedUserId}
        })
        res.status(200).json("ok");
        
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = addLike;