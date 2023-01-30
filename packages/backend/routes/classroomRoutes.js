const router = require('express').Router();

const {
  checkTeacherAuthenticated,
  validateMessage,
} = require('../middlewares');

const {
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addClassroomEvent,
  updateClassroomEvent,
  deleteClassroomEvent,
  broadcastMessage,
} = require('../controllers/classroomController');

router.get('/', checkTeacherAuthenticated, getClassroom);
router.post('/create', checkTeacherAuthenticated, createClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);

router.post('/event', checkTeacherAuthenticated, addClassroomEvent);
router.put('/event', checkTeacherAuthenticated, updateClassroomEvent);
router.delete('/event', checkTeacherAuthenticated, deleteClassroomEvent);

router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);

module.exports = router;
