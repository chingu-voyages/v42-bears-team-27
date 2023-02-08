const router = require('express').Router();

const {
  validateStudent,
  checkStudentAuthenticated,
  checkTeacherAuthenticated,
  validateMarkMessageAsReadRequest,
} = require('../middlewares');

const {
  createStudent,
  getStudent,
  markMessageAsRead,
} = require('../controllers/studentController');

// "http://localhost:5000/api/v0/student/create"
router.post(
  '/create',
  checkTeacherAuthenticated,
  validateStudent,
  createStudent,
);
router.get('/', checkStudentAuthenticated, getStudent);
router.post(
  '/mark-message-as-read',
  checkStudentAuthenticated,
  validateMarkMessageAsReadRequest,
  markMessageAsRead,
);

module.exports = router;
