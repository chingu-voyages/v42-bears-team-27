/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const router = require('express').Router();

const { validateTeacher } = require('../validators/teacherValidator');
const {
  authenticateTeacher,
  checkTeacherAuthenticated,
} = require('../middleware/auth');

const {
  createTeacher,
  loginTeacher,
  testTeacher,
} = require('../controllers/teacherController');

router.route('/create').post(validateTeacher, createTeacher);
router.post('/login', authenticateTeacher, loginTeacher);
router.get('/test', checkTeacherAuthenticated, testTeacher);

module.exports = router;
