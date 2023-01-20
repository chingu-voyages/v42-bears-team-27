const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const Student = require('../models/studentModel');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
