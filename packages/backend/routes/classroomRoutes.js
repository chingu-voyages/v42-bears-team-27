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
  broadcastMessage,
  deleteClassroomEvent,
  addClassroomEvent,
  updateClassroomEvent,
} = require('../controllers/classroomController');

router.post('/create', checkTeacherAuthenticated, createClassroom);
router.get('/', checkTeacherAuthenticated, getClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);
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

module.exports = router;
