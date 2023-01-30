const router = require('express').Router();

const {
  validateStudent,
  authenticateStudent,
  checkStudentAuthenticated,
  checkTeacherAuthenticated,
} = require('../middlewares');

const {
  createStudent,
  loginStudent,
  getStudent,
  testStudent,
} = require('../controllers/studentControllers');

// "http://localhost:5000/api/v0/student/create"
router.post(
  '/create',
  checkTeacherAuthenticated,
  validateStudent,
  createStudent,
);
router.post('/login', authenticateStudent, loginStudent);
router.get('/', checkStudentAuthenticated, getStudent);
router.get('/test', checkStudentAuthenticated, testStudent);

module.exports = router;
