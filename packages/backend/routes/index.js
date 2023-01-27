const router = require('express').Router();

const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');
const classroomRoutes = require('./classroomRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/classroom', classroomRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;
