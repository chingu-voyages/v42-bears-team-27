const router = require('express').Router();

router.post('/create', function (req, res, _) {
  const data = req.body;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ dataRecieved: data }));
});

module.exports = router;
