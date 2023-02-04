const router = require('express').Router();

const { checkTeacherAuthenticated } = require('../middlewares');

const {
  getClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomSubjects,
  getClassroomEvent,
  getClassroomEvents,
  addClassroomEvent,
  updateClassroomEvent,
  deleteClassroomEvent,
  addTask,
  // updateTask,
  deleteTask,
} = require('../controllers/classroomController');

router.get('/', checkTeacherAuthenticated, getClassroom);
router.put('/', checkTeacherAuthenticated, updateClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);

router.get('/subjects', checkTeacherAuthenticated, getClassroomSubjects);

router.get('/event/:id', checkTeacherAuthenticated, getClassroomEvent);
router.get('/events', checkTeacherAuthenticated, getClassroomEvents);
router.post('/events/create', checkTeacherAuthenticated, addClassroomEvent);
router.put('/events/:id', checkTeacherAuthenticated, updateClassroomEvent);
router.delete('/events/:id', checkTeacherAuthenticated, deleteClassroomEvent);

router.post('/tasks/create', checkTeacherAuthenticated, addTask);
// router.put('/tasks/:id', checkTeacherAuthenticated, updateTask);
router.delete('/tasks/:id', checkTeacherAuthenticated, deleteTask);

module.exports = router;
