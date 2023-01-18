const express = require('express');

const router = express.Router();

const dasbaordController = require('../controllers/teacherDashboardController');

router.post(
  '/create',
  dasbaordController.addclass,
  // create classroom data
  // return success message
);
router.get(
  '/:id',
  dasbaordController.getClassroom,
  // return classroom data
);

router.delete(
  '/:id',
  dasbaordController.deleteClassroom,
  // delete classroom
  // return success message
);

router.put(
  '/:id',
  dasbaordController.updateClassroom,
  // delete classroom
  // return success message
);

module.exports = router;
