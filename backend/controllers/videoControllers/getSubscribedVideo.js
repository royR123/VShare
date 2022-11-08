const Video = require('../../models/Video');
const User = require('../../models/User');
const getSubscribedVideo  = async (req,res) => {
    try {
        console.log("here in subscribed controller");
        console.log(req.decodedUserId);
        const this_user = await User.findOne({userId : req.decodedUserId});
        const subUsersId = this_user.subscriberedUsers;
        const subVideos = await Promise.all(
            subUsersId.map(async (subUserId) => {
                return await Video.find({ userId : subUserId});
            })
        )
        const videos = subVideos.flat();
        console.log(videos);
        res.status(200).json(videos);
        // res.send(subUsers);
    } catch (error) {
        
    }
}
module.exports = getSubscribedVideo ;