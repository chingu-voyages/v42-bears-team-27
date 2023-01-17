const express = require('express');

const { createStudent } = require('../controllers/studentControllers');
const { validateStudent } = require('../validators/studentValidator');

const router = express.Router();

// "/student/create"
router.post('/create', validateStudent, createStudent);

module.exports = router;
