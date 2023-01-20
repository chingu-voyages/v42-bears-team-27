const router = require('express').Router();

const { validateStudent } = require('../validators/studentValidator');
const { studentLocalAuth, studentJwtAuth } = require('../middleware/auth');
const {
  createStudent,
  loginStudent,
  testStudent,
} = require('../controllers/studentControllers');

// "http://localhost:5000/api/v0/student/create"
router.post('/create', validateStudent, createStudent);
router.post('/login', studentLocalAuth, loginStudent);
router.get('/test', studentJwtAuth, testStudent);

module.exports = router;
