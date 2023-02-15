const router = require('express').Router();

const {
  authenticateTeacher,
  authenticateStudent,
  validateLoginCredentials,
} = require('../middlewares');

const {
  loginTeacher,
  loginStudent,
  logout,
} = require('../controllers/authController');

// "http://localhost:5000/api/v0/auth"
router.post(
  '/teacher',
  validateLoginCredentials,
  authenticateTeacher,
  loginTeacher,
);
router.post(
  '/student',
  validateLoginCredentials,
  authenticateStudent,
  loginStudent,
);
router.get('/logout', logout);

module.exports = router;
