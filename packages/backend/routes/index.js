const router = require('express').Router();

const teacherRouter = require('./teacherRouter');
const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');

router.use('/teachers', teacherRouter);
router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);

module.exports = router;
