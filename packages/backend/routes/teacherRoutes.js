const router = require('express').Router();

const {
  validateTeacher,
  validateDirectMessage,
  authenticateTeacher,
  checkTeacherAuthenticated,
} = require('../middlewares');

const {
  createTeacher,
  loginTeacher,
  sendDirectMessageToStudent,
  testTeacher,
} = require('../controllers/teacherController');

router.post('/create', validateTeacher, createTeacher);
router.post('/login', authenticateTeacher, loginTeacher);
router.post(
  '/send-direct-message',
  checkTeacherAuthenticated,
  validateDirectMessage,
  sendDirectMessageToStudent,
);
router.get('/test', checkTeacherAuthenticated, testTeacher);

module.exports = router;
