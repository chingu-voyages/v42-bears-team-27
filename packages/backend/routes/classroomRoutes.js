const router = require('express').Router();

const { checkTeacherAuthenticated } = require('../middlewares');

const {
  updateNameClassroom,
  // deleteClassroom,
  // updateClassroom,
  getClassroom,
  // addClassroom,
} = require('../controllers/classroomController');

router.put('/name', checkTeacherAuthenticated, updateNameClassroom);
router.get(
  '/',
  checkTeacherAuthenticated,
  getClassroom,
  // return classroom data
);

// router.post(
//   '/create',
//   addClassroom,
//   // return success message
// );
// router.get(
//   '/:id',
//   getClassroom,
//   checkTeacherAuthenticated,
//   checkSameUser,
//   // return classroom data
// );

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
