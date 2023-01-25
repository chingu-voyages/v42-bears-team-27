/* eslint-disable consistent-return */
const Teacher = require('../models/teacherModel');
const Classroom = require('../models/classroomModel');

const createTeacher = async (req, res) => {
  /* 
    title: 'Mrs', 
    fullName: 'Jane Doe',
    email: 'janedoe@example.com'
    password: '123456'
    confirmPassword: '123456'
  */

  const { title, fullName, email, password } = req.body;

  const passwordHash = Teacher.hashPassword(password);

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

    const classroom = await Classroom.create({});

    if (classroom) {
      const teacher = await Teacher.create({
        title,
        fullName,
        email,
        passwordHash,
        classroom: classroom._id,
      });

      if (teacher) {
        classroom.teacher = teacher._id;
        await classroom.save();

        const payload = {
          _id: teacher._id,
          email: teacher.email,
        };
        return res
          .cookie('auth', JSON.stringify(payload), {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + 2592000), // 30 days
          })
          .json({
            id: teacher._id,
            email: teacher.email,
            title: teacher.title,
            fullName: teacher.fullName,
          });
      }
    }
  } catch (error) {
    // TODO: more robust logging (morgan?)
    // TODO: log other events too? not just errors?
    // not all errors are being catch
    // console.log(`Error while saving teacher to database ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
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
    return res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000), // 30 days
      })
      .json({
        id: user._id,
        email: user.email,
        title: user.title,
        fullName: user.fullName,
      });
  });
};

const testTeacher = async (req, res) =>
  res.json({ message: 'authenticated teacher!' });

module.exports = { createTeacher, loginTeacher, testTeacher };
