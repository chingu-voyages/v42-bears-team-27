const router = require('express').Router();

const teacherRouter = require('./teacherRouter');

router.use('/teachers', teacherRouter);

module.exports = router;
