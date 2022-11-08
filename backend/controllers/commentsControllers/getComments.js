const Comments = require('../../models/Comment');

const getComments = async (req,res) => {
    try {
        console.log("in get comments");
        console.log(req.params.videoId);
        const comments = await Comments.find({videoId : req.params.videoId})
        console.log(comments);
        res.status(201).json(comments);
    } catch (error) {
        
    }
}
module.exports = getComments;