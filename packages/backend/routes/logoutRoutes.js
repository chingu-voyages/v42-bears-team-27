const router = require('express').Router();

const { logout } = require('../controllers/logoutControllers');

// "http://localhost:5000/api/v0/logout"
router.get('/', logout);

module.exports = router;
