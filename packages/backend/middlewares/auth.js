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
  passport.authenticate('student-jwt', { session: false }, (error, user) => {
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
  passport.authenticate('teacher-jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ message: 'not authorized' });
    }
    res.locals.user = user;
    return next();
  })(req, res);
};

module.exports = {
  authenticateStudent,
  checkStudentAuthenticated,
  authenticateTeacher,
  checkTeacherAuthenticated,
};
