const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
  'student-jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    (jwtPayload, callback) =>
      Student.findById(jwtPayload._id, (error, student) => {
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
  'teacher-jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    (jwtPayload, callback) =>
      Teacher.findById(jwtPayload._id, (error, teacher) => {
        if (error) {
          return callback(error);
        }

        return callback(null, teacher);
      }),
  ),
);
