const router = require('express').Router();

const {
  validateTeacher,
  authenticateTeacher,
  checkTeacherAuthenticated,
} = require('../middlewares');

const {
  createTeacher,
  loginTeacher,
  getTeacher,
  testTeacher,
} = require('../controllers/teacherController');

router.post('/create', validateTeacher, createTeacher);
router.post('/login', authenticateTeacher, loginTeacher);
router.get('/', checkTeacherAuthenticated, getTeacher);
router.get('/test', checkTeacherAuthenticated, testTeacher);

module.exports = router;
