const router = require('express').Router();

const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');

router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);

module.exports = router;
