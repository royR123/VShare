const Video = require("../../models/Video");
const {v4 : uuidv4} = require('uuid');
const addVideo = async (req,res) => {
    try {
        console.log("in adding video");
        if(req.decodedUserId !== req.params.userId){
            res.status(401).send('You are not authorised');
            return ;
        }
        const videoId  = uuidv4();
        const newVideo = new Video({userId : req.params.userId, videoId : videoId , ...req.body});
        await newVideo.save();

        res.status(200).send(newVideo);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addVideo;