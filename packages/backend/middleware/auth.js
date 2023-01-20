const passport = require('passport');

require('../utils/auth');

const studentLocalAuth = (req, res, next) => {
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

const studentJwtAuth = (req, res, next) => {
  passport.authenticate('student-jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ message: 'not authorized' });
    }
    res.locals.user = user;
    return next();
  })(req, res);
};

module.exports = {
  studentLocalAuth,
  studentJwtAuth,
};
