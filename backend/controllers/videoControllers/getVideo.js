const Video = require('../../models/Video');

const video = async (req,res) => {
    try {
        const vid_id = req.params.videoId;
        const vid = await Video.findOne({videoId : vid_id});
        res.status(200).json(vid);

    } catch (error) {
        res.json(error);
    }
}
module.exports = video;