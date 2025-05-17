const express = require('express');
const router = express.Router();
const { removeCourse } = require('../controllers/removeController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.post('/profile/remove-course/:courseId', authenticateToken, removeCourse);

module.exports = router;