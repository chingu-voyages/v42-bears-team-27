const router = require('express').Router();

const { checkTeacherAuthenticated, checkSameUser } = require('../middlewares');

const {
  updateNameClassroom,
  // deleteClassroom,
  // updateClassroom,
  getClassroom,
  // addClassroom,
} = require('../controllers/classroomController');

router.put(
  '/newname',
  checkTeacherAuthenticated,
  checkSameUser,
  updateNameClassroom,
);
// router.post(
//   '/create',
//   addClassroom,
//   // return success message
// );
router.get(
  '/:id',
  getClassroom,
  checkTeacherAuthenticated,
  checkSameUser,
  // return classroom data
);

// router.delete(
//   '/:id',
//   deleteClassroom,
//   // return success message
// );

// router.put(
//   '/:id',
//   updateClassroom,
//   // return success message
// );

module.exports = router;
