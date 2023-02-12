const router = require('express').Router();

const authRoutes = require('./authRoutes');
const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');
const materialRoutes = require('./materialRoutes');

router.use('/auth', authRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);
router.use('/material', materialRoutes);

module.exports = router;
