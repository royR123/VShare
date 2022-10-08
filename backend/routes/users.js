const express = require('express');
const router = express.Router();

//signup a user
router.post('/signup',require('../controllers/signup'))

//login a user
router.post('/login',require('../controllers/login'))

module.exports = router;