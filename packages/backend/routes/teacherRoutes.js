const router = require('express').Router();

const {
  validateTeacher,
  validateDirectMessage,
  checkTeacherAuthenticated,
  validateMessage,
} = require('../middlewares');

const {
  createTeacher,
  getTeacher,
  sendDirectMessageToStudent,
  broadcastMessage,
} = require('../controllers/teacherController');

// "http://localhost:5000/api/v0/teacher"
router.post('/create', validateTeacher, createTeacher);
router.get('/', checkTeacherAuthenticated, getTeacher);
router.post(
  '/send-direct-message',
  checkTeacherAuthenticated,
  validateDirectMessage,
  sendDirectMessageToStudent,
);
router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);

module.exports = router;
