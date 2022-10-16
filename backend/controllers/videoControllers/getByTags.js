const Video = require('../../models/Video');

const getByTags = async (req,res) => {
    try {
        const tags = req.query.tags.split(',');
        const videos = await Video.find({tags : { $in : tags }}).limit(30);
        res.status(200).send(videos);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = getByTags;