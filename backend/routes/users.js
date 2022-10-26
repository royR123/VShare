const express = require('express');
const router = express.Router();
const { verifyUser } = require('../middlewares/authMiddleware');

//signup a user 
router.post('/signup',require('../controllers/userControllers/signup'));

//login a user
router.post('/login',require('../controllers/userControllers/login'));

//get a user 
router.get('/getUser/:userId',require('../controllers/userControllers/getUser'));

//update a user
router.put('/update/:userId',verifyUser ,require('../controllers/userControllers/updateUser'));

//delete a user
router.delete('/delete/:userId',verifyUser ,require('../controllers/userControllers/deleteUser'));

//subscribe a user
router.put('/subscribe/:userId',verifyUser , require('../controllers/userControllers/subscribeUser'));

//unsubscribe a user
router.put('/unsubscribe/:userId',verifyUser , require('../controllers/userControllers/unsubscribeUser'));

router.get('/videos/:userId',require('../controllers/userControllers/getVideos'))

module.exports = router;