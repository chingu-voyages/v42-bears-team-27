const router = require('express').Router();

const { validateTeacher } = require('../validators/teacherValidator');

router.route('/create').post(validateTeacher, function (req, res, _) {
  const data = req.body;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ dataRecieved: data }));
});

module.exports = router;
