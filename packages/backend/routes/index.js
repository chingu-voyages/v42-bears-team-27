const router = require('express').Router();

const classroomRoutes = require('./classroomRoutes');

router.use('/classroom', classroomRoutes);

module.exports = router;
