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
} = require('../controllers/classroomController');

router.post('/create', checkTeacherAuthenticated, createClassroom);
router.get('/', checkTeacherAuthenticated, getClassroom);
router.delete('/:id', checkTeacherAuthenticated, deleteClassroom);
router.put('/:id', checkTeacherAuthenticated, updateClassroom);
router.post(
  '/broadcast-message',
  checkTeacherAuthenticated,
  validateMessage,
  broadcastMessage,
);

module.exports = router;
