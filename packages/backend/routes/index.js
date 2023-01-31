const router = require('express').Router();

const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');
const authRoutes = require('./authRoutes');

router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);
router.use('/auth', authRoutes);

module.exports = router;
