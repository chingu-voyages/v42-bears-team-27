const router = require('express').Router();

const {
  validateStudent,
  checkStudentAuthenticated,
  checkTeacherAuthenticated,
  checkUserAuthenticated,
} = require('../middlewares');

const {
  createStudent,
  getStudent,
  getStudentProfile,
  getStudentTasks,
} = require('../controllers/studentController');

// "http://localhost:5000/api/v0/student/create"
router.post(
  '/create',
  checkTeacherAuthenticated,
  validateStudent,
  createStudent,
);
router.get('/', checkStudentAuthenticated, getStudent);
router.get('/profile/:id', checkUserAuthenticated, getStudentProfile);
router.get('/tasks', checkStudentAuthenticated, getStudentTasks);

module.exports = router;
