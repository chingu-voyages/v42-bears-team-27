const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;

const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

// Student Auth Strategies
passport.use(
  'student-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, callback) => {
      Student.findOne({ email }, (error, student) => {
        if (error) {
          return callback(error);
        }

        if (!student) {
          return callback(null, false, { message: 'incorrect user' });
        }

        if (!student.validatePassword(password)) {
          return callback(null, false, { message: 'incorrect password' });
        }

        return callback(null, student);
      });
    },
  ),
);

passport.use(
  'student-cookie',
  new CookieStrategy(
    {
      cookieName: 'auth',
      signed: true,
      passReqToCallback: true,
    },
    (req, token, callback) =>
      Student.findById(JSON.parse(token)._id, (error, student) => {
        if (error) {
          return callback(error);
        }

        return callback(null, student);
      }),
  ),
);

// Teacher Auth Strategies
passport.use(
  'teacher-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, callback) => {
      Teacher.findOne({ email }, (error, teacher) => {
        if (error) {
          return callback(error);
        }

        if (!teacher) {
          return callback(null, false, { message: 'incorrect user' });
        }

        if (!teacher.validatePassword(password)) {
          return callback(null, false, { message: 'incorrect password' });
        }

        return callback(null, teacher);
      });
    },
  ),
);

passport.use(
  'teacher-cookie',
  new CookieStrategy(
    {
      cookieName: 'auth',
      signed: true,
      passReqToCallback: true,
    },
    (req, token, callback) =>
      Teacher.findById(JSON.parse(token)._id, (error, teacher) => {
        if (error) {
          return callback(error);
        }
        return callback(null, teacher);
      }),
  ),
);
