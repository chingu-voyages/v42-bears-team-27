const router = require('express').Router();

const {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
} = require('../controllers/classroomController');

router.post(
  '/create',
  addClassroom,
  // return success message
);
router.get(
  '/:id',
  getClassroom,
  // return classroom data
);

router.delete(
  '/:id',
  deleteClassroom,
  // return success message
);

router.put(
  '/:id',
  updateClassroom,
  // return success message
);

module.exports = router;
