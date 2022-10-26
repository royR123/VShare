const Video = require('../../models/Video');


const addView = async (req,res) => {
    try {
        console.log("in add view");
        await  Video.findOneAndUpdate({videoId : req.params.videoId} , {
            $inc : {views : 1},
        })
        res.status(200).json("Ok");
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = addView;