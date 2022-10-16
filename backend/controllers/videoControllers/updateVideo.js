const Video = require("../../models/Video");

const updateVideo = async (req,res) => {
    try {
        const updateVideo = await Video.findOne({videoId : req.query.videoId});
        if(!updateVideo){
            res.status(400).send("video not found");
            return;
        }
        if(updateVideo.userId !== req.decodedUserId){
            res.status(401).send('you are not authorised');
            return ;
        }
        const updatedVideo = await Video.findOneAndUpdate({videoId : req.query.videoId},{
            $set: req.body,
        },{ new : true }
        )
        res.status(200).send(updatedVideo);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = updateVideo;