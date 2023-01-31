const router = require('express').Router();

const { authenticateTeacher, authenticateStudent } = require('../middlewares');

const {
  loginTeacher,
  loginStudent,
  logout,
} = require('../controllers/authController');

router.get('/teacher', authenticateTeacher, loginTeacher);
router.get('/student', authenticateStudent, loginStudent);
// "http://localhost:5000/api/v0/auth/logout"
router.get('/logout', logout);

module.exports = router;
