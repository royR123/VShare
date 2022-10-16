const Video = require("../../models/Video");

const getTrendingVideo  = async (req,res) => {
    try {
        console.log("here in trending");
        const videos = await Video.find().sort({views : -1});
        console.log(videos);
        res.status(200).send(videos);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getTrendingVideo ;