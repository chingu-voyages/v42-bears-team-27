const router = require('express').Router();

const {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
} = require('../controllers/classroomController');

const { checkTeacherAuthenticated } = require('../middlewares');

router.post('/create', checkTeacherAuthenticated, addClassroom);
router.get('/:id', checkTeacherAuthenticated, getClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);

module.exports = router;
