/* eslint-disable consistent-return */
const teacherModel = require('../models/teacherModel');
const Teacher = require('../models/teacherModel');
const { generateJWT } = require('../utils');

const createTeacher = async (req, res) => {
  /* 
    title: 'Mrs', 
    fullname: 'Jane Doe',
    email: 'janedoe@example.com'
    password: '123456'
    confirmPassword: '123456'
  */

  const { title, fullname, email, password } = req.body;

  // TODO: hash the password
  const passwordHash = teacherModel.hashPassword(password);

  try {
    const prevTeacher = await Teacher.findOne({ email });

    if (prevTeacher) {
      const errors = [
        {
          value: email,
          msg: 'There is already an account with this email',
          param: 'email',
          location: 'body',
        },
      ];

      return res.status(400).json({ errors });
    }

    const teacher = await Teacher.create({
      title,
      fullname,
      email,
      passwordHash,
    });

    if (teacher) {
      const payload = {
        _id: teacher._id,
        email: teacher.email,
      };
      const token = generateJWT(payload);
      return res.json({
        title: teacher.title,
        fullname: teacher.fullname,
        email: teacher.email,
        token,
      });
    }
  } catch (error) {
    // TODO: more robust logging (morgan?)
    // TODO: log other events too? not just errors?
    console.log(`Error while saving teacher to database ${error}`);
    return res.status(500).json({ message: 'Inetrnal server error' });
  }
};

const loginTeacher = async (req, res) => {
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = generateJWT(payload);
    return res.json({
      email: user.email,
      title: user.title,
      fullname: user.fullname,
      token,
    });
  });
};

const testTeacher = async (req, res) =>
  res.json({ message: 'authenticated teacher!' });

module.exports = { createTeacher, loginTeacher, testTeacher };
