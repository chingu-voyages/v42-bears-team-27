const router = require('express').Router();

const {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
  broadcastMessage,
} = require('../controllers/classroomController');

const {
  checkTeacherAuthenticated,
  validateMessage,
} = require('../middlewares');

router.post('/create', checkTeacherAuthenticated, addClassroom);
router.get('/:id', checkTeacherAuthenticated, getClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);
router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);

module.exports = router;
