const router = require('express').Router();

const { authenticateTeacher, authenticateStudent } = require('../middlewares');

const {
  loginTeacher,
  loginStudent,
  logout,
} = require('../controllers/authController');

router.post('/teacher', authenticateTeacher, loginTeacher);
router.post('/student', authenticateStudent, loginStudent);
// "http://localhost:5000/api/v0/auth/logout"
router.get('/logout', logout);

module.exports = router;
