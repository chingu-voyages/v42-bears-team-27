const router = require('express').Router();

const { checkStudentAuthenticated } = require('../middlewares');

const {
  getAllLessons,
  getLesson,
  getAllExercises,
  getExercises,
} = require('../controllers/materialController');

// "http://localhost:5000/api/v0/material"
router.get('/lessons', checkStudentAuthenticated, getAllLessons);
router.get('/lessons/:id', checkStudentAuthenticated, getLesson);
router.get('/exercises', checkStudentAuthenticated, getAllExercises);
router.get('/exercises/:id', checkStudentAuthenticated, getExercises);

module.exports = router;
