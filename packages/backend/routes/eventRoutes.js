const router = require('express').Router();


const {
    addEvent
  } = require('../controllers/eventControllers');
  
  const {
    checkTeacherAuthenticated,
  } = require('../middlewares');



router.post('/create', checkTeacherAuthenticated, addEvent);


module.exports = router