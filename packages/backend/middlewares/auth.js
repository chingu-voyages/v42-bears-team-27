const passport = require('passport');

require('../utils/auth');

// Student Auth middlewares
const authenticateStudent = (req, res, next) => {
  passport.authenticate(
    'student-local',
    { session: false },
    (error, user, info) => {
      if (error || !user) {
        return res.status(400).json(info);
      }
      res.locals.user = user;
      return next();
    },
  )(req, res);
};

const checkStudentAuthenticated = (req, res, next) => {
  passport.authenticate('student-cookie', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ message: 'not authorized' });
    }
    res.locals.user = user;
    return next();
  })(req, res);
};

// Teacher Auth middlewares
const authenticateTeacher = (req, res, next) => {
  passport.authenticate(
    'teacher-local',
    { session: false },
    (error, user, info) => {
      if (error || !user) {
        return res.status(400).json(info);
      }
      res.locals.user = user;
      return next();
    },
  )(req, res);
};

const checkTeacherAuthenticated = (req, res, next) => {
  passport.authenticate('teacher-cookie', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ message: 'not authorized' });
    }
    res.locals.user = user;
    return next();
  })(req, res);
};

// Compare JWT User and body or params User id, so users can't see other users details
const checkSameUser = (req, res, next) => {
  if (res.locals.user._id.toString() === req.body.id) {
    return next();
  }
  if (res.locals.user._id.toString() === req.params.id) {
    return next();
  }
  return res.status(401).json({ message: 'not authorized' });
};

module.exports = {
  authenticateStudent,
  checkStudentAuthenticated,
  authenticateTeacher,
  checkTeacherAuthenticated,
  checkSameUser,
};
