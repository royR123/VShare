const Video = require("../../models/Video");

const deleteVideo = async (req,res) => {
    try {
        const deleteVideo = await Video.findOne({videoId : req.query.videoId});
        if(!deleteVideo){
            res.status(400).send("video not found");
            return;
        }
        if(deleteVideo.userId !== req.decodedUserId){
            res.status(401).send('you are not authorised');
            return ;
        }
        await Video.findOneAndDelete({videoId : req.query.videoId});
        res.status(200).send("video is deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = deleteVideo;