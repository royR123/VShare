const Video = require('../../models/Video');

const getVideos = async (req,res) => {
    try {
        const userId = req.params.userId;
        const videos = await Video.find({userId : userId}).limit(50);
        res.status(200).json(videos);
    } catch (error) {
        
    }
}

module.exports = getVideos;