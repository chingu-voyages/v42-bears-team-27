const router = require('express').Router();

const { logout } = require('../controllers/authController');

// "http://localhost:5000/api/v0/auth/logout"
router.get('/logout', logout);

module.exports = router;
