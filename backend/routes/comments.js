const express = require('express');
const router = express.Router();
const { verifyUser } = require('../middlewares/authMiddleware');

router.post('/add/:userId', verifyUser ,require('../controllers/commentsControllers/addComment'))
router.get('/:videoId',require('../controllers/commentsControllers/getComments'));

module.exports = router;