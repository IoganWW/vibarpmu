const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken }= require('../middlewares/authMiddleware');

router.get('/users/profile', authenticateToken, getProfile);
router.post('/users/profile', authenticateToken, updateProfile);

module.exports = router;