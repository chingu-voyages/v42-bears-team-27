const router = require('express').Router();

const {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
  broadcastMessage,
  deleteClassroomEvent,
  addClassroomevent,
  updateClassroomevent
} = require('../controllers/classroomController');

const {
  checkTeacherAuthenticated,
  validateMessage,
} = require('../middlewares');

router.post('/create', checkTeacherAuthenticated, addClassroom);
router.get('/', checkTeacherAuthenticated, getClassroom);
router.delete('/', checkTeacherAuthenticated, deleteClassroom);
router.put('/', checkTeacherAuthenticated, updateClassroom);
router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);
router.post('/events', checkTeacherAuthenticated, addClassroomevent)
router.delete('/events', checkTeacherAuthenticated, deleteClassroomEvent)
router.put('/events/:id', checkTeacherAuthenticated, updateClassroomevent)

module.exports = router;
