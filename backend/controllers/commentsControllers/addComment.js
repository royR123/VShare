const Comments = require('../../models/Comment');

const addComment = async (req,res) => {
    try {
        if(req.decodedUserId !== req.params.userId){
            return res.json("Invalid user");
        }
        const comment = new Comments({...req.body})
        await comment.save();
        res.status(201).json("comment is added");
    } catch (error) {
        
    }
}

module.exports = addComment;