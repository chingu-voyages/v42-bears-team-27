const express = require('express');

const router = express.Router();

const {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
} = require('../controllers/classroomController');

router.post(
  '/create',
  addClassroom,
  // create classroom data
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
  // delete classroom
  // return success message
);

router.put(
  '/:id',
  updateClassroom,
  // delete classroom
  // return success message
);

module.exports = router;
