const express = require('express');
const router = express.Router();
const { verifyUser } = require('../middlewares/authMiddleware');

//add a video
router.post('/add/:userId', verifyUser , require('../controllers/videoControllers/addVideo'));

//delete a video
router.delete('/delete/:userId',verifyUser , require('../controllers/videoControllers/deleteVideo'));

//update a video
router.put('/update/:userId',verifyUser , require('../controllers/videoControllers/updateVideo'));

//get a video
router.get('/get/:videoId',require('../controllers/videoControllers/getVideo'));

//get trending videos
router.get('/trending',require('../controllers/videoControllers/getTrendingVideo'));

//get subscribers videos
router.get('/subscribed', verifyUser , require('../controllers/videoControllers/getSubscribedVideo'));

// get video by search
router.get('/search',require('../controllers/videoControllers/searchVideo'));

//get random videos
router.get('/random',require('../controllers/videoControllers/randomVideo'));

//get videos by tags
router.get('/tags',require('../controllers/videoControllers/getByTags'));

module.exports = router;