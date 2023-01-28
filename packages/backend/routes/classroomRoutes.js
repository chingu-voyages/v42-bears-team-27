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
