const router = require('express').Router();

const {
  validateStudent,
  checkStudentAuthenticated,
  checkTeacherAuthenticated,
} = require('../middlewares');

const {
  createStudent,
  getStudent,
} = require('../controllers/studentController');

// "http://localhost:5000/api/v0/student/create"
router.post(
  '/create',
  checkTeacherAuthenticated,
  validateStudent,
  createStudent,
);
router.get('/', checkStudentAuthenticated, getStudent);

module.exports = router;
