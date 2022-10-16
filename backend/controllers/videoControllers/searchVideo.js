const Video = require('../../models/Video');

const searchedVideo = async (req,res) => {
    try {
        const qry = req.query.q;
        const videos = await Video.find({title : {$regex : qry , $options: "i"}}).limit(30);
        res.status(200).send(videos);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = searchedVideo;