const router = require('express').Router();

const { validateStudent } = require('../validators/studentValidator');
const { createStudent } = require('../controllers/studentControllers');

// "http://localhost:5000/api/v0/student/create"
router.post('/create', validateStudent, createStudent);

module.exports = router;
