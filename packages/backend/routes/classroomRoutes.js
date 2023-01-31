const router = require('express').Router();

const { checkTeacherAuthenticated } = require('../middlewares');

const {
  getClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomSubjects,
  getClassroomEvents,
  addClassroomEvent,
  updateClassroomEvent,
  deleteClassroomEvent,
} = require('../controllers/classroomController');

router.get('/', checkTeacherAuthenticated, getClassroom);
router.put('/', checkTeacherAuthenticated, updateClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);

router.get('/subjects', checkTeacherAuthenticated, getClassroomSubjects);

router.get('/events', checkTeacherAuthenticated, getClassroomEvents);
router.post('/events/create', checkTeacherAuthenticated, addClassroomEvent);
router.put('/events/:id', checkTeacherAuthenticated, updateClassroomEvent);
router.delete('/events/:id', checkTeacherAuthenticated, deleteClassroomEvent);

module.exports = router;
