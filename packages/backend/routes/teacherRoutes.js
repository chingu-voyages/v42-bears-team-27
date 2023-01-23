const router = require('express').Router();

const {
  validateTeacher,
  authenticateTeacher,
  checkTeacherAuthenticated,
} = require('../middlewares');

const {
  createTeacher,
  loginTeacher,
  testTeacher,
} = require('../controllers/teacherController');

router.post('/create', validateTeacher, createTeacher);
router.post('/login', authenticateTeacher, loginTeacher);
router.get('/test', checkTeacherAuthenticated, testTeacher);

module.exports = router;
