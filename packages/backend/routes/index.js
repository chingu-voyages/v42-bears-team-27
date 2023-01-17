const router = require('express').Router();

const studentRoutes = require('./studentRoutes');

router.use('/student', studentRoutes);

module.exports = router;
