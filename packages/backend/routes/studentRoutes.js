const express = require('express');

const { createStudent } = require('../controllers/studentControllers');

const router = express.Router();

// "/student/create"
router.post('/create', createStudent);

module.exports = router;
