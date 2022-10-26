const Video = require('../../models/Video');

const addDislike = async (req,res) => {
    console.log(req.params);
    try {
        await Video.findOneAndUpdate({videoId : req.params.videoId},{
            $addToSet:{dislikes : req.decodedUserId},
            $pull:{likes : req.decodedUserId}
        })
        res.status(200).json("ok");
        
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = addDislike;