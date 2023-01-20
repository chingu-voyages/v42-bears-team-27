const router = require('express').Router();

const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');

router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);

module.exports = router;
