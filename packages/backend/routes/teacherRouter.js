const router = require('express').Router();

const { validateTeacher } = require('../validators/teacherValidator');
const { createTeacher } = require('../controllers/teacherController');

router.route('/create').post(validateTeacher, createTeacher);

module.exports = router;
