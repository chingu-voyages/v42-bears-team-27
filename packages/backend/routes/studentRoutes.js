const router = require('express').Router();

const {
  validateStudent,
  checkStudentAuthenticated,
  checkTeacherAuthenticated,
  validateMarkMessageAsReadRequest,
  checkUserAuthenticated,
} = require('../middlewares');

const {
  createStudent,
  getStudent,
  getStudentInbox,
  markMessageAsRead,
  getStudentProfile,
  getStudentTasks,
  updateStudentTask,
} = require('../controllers/studentController');

// "http://localhost:5000/api/v0/student"
router.post(
  '/create',
  checkTeacherAuthenticated,
  validateStudent,
  createStudent,
);
router.get('/', checkStudentAuthenticated, getStudent);
router.get('/inbox', checkStudentAuthenticated, getStudentInbox);
router.post(
  '/mark-message-as-read',
  checkStudentAuthenticated,
  validateMarkMessageAsReadRequest,
  markMessageAsRead,
);
router.get('/profile/:id', checkUserAuthenticated, getStudentProfile);
router.get('/tasks', checkStudentAuthenticated, getStudentTasks);
router.put('/task', checkStudentAuthenticated, updateStudentTask);

module.exports = router;
