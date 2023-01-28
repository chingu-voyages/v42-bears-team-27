const router = require('express').Router();

const {
  checkTeacherAuthenticated,
  validateMessage,
} = require('../middlewares');

const {
  createClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom,
  broadcastMessage,
  getClassroomEvents,
  deleteClassroomEvent,
  addClassroomEvent,
  updateClassroomEvent,
} = require('../controllers/classroomController');

router.get('/', checkTeacherAuthenticated, getClassroom);
router.post('/create', checkTeacherAuthenticated, createClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);

router.get('/events', checkTeacherAuthenticated, getClassroomEvents);
router.post('/events/create', checkTeacherAuthenticated, addClassroomEvent);
router.delete('/events/:id', checkTeacherAuthenticated, deleteClassroomEvent);
router.put('/events/:id', checkTeacherAuthenticated, updateClassroomEvent);

router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);

module.exports = router;
