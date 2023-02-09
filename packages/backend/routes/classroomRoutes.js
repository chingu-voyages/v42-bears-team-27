const router = require('express').Router();

const {
  checkTeacherAuthenticated,
  checkUserAuthenticated,
} = require('../middlewares');

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
  getTask,
  addTask,
  // updateTask,
  deleteTask,
} = require('../controllers/classroomController');

// "http://localhost:5000/api/v0/classroom"
router.get('/', checkUserAuthenticated, getClassroom);
router.put('/', checkTeacherAuthenticated, updateClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);

router.get('/subjects', checkTeacherAuthenticated, getClassroomSubjects);

router.get('/event/:id', checkUserAuthenticated, getClassroomEvent);
router.get('/events', checkUserAuthenticated, getClassroomEvents);
router.post('/events/create', checkTeacherAuthenticated, addClassroomEvent);
router.put('/events/:id', checkTeacherAuthenticated, updateClassroomEvent);
router.delete('/events/:id', checkTeacherAuthenticated, deleteClassroomEvent);

router.get('/task/:id', checkUserAuthenticated, getTask);
router.post('/tasks/create', checkTeacherAuthenticated, addTask);
// router.put('/tasks/:id', checkTeacherAuthenticated, updateTask);
router.delete('/tasks/:id', checkTeacherAuthenticated, deleteTask);

module.exports = router;
