const Video = require('../../models/Video');

const randomVideos = async (req,res) => {
    console.log("in random videos");
    try{
        const video = await Video.find().limit(30);
        console.log(video);
        res.status(200).send(video);
    }catch(error){
        res.status(500).send(error);
    }
}
module.exports = randomVideos;