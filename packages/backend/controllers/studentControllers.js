/* eslint spaced-comment: 0 */
const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Classroom = require('../models/classroomModel');
const { generatePassword, sendEmail } = require('../utils');

const createStudent = async (req, res) => {
  /*  fullName: 'LastName, FirstName',
      email: '123@123.com,
      From Teacher Auth:
      classroom: '63c339704aa8be1b4851e7b5'  */
  const { fullName, email } = req.body;
  const { classroom } = res.locals.user;
  const password = generatePassword(6);
  const hashedPassword = await Student.hashPassword(password);

  try {
    const existentStudent = await Student.findOne({ email });
    if (existentStudent) {
      return res.status(400).json({
        message: `Student email: ${email} is already in use`,
      });
    }

    const newStudent = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      classroom,
    });

    // Add Student to classroom collection DB
    const studentClassroom = await Classroom.findById(classroom);
    if (!studentClassroom) {
      return res.status(400).json({
        message: 'classroom not found',
      });
    }
    studentClassroom.students.push(newStudent._id);
    await studentClassroom.save();

    if (process.env.NODE_ENV === 'production') {
      // send email to student with the password
      const content = () => /*html*/ `You have been registered into
            Remote Class! Please use your email and this password to
            login.<br>Password: ${password}`;
      const emailWrap = {
        to: email,
        subject: 'Welcome to Remote Class',
        message: content(),
      };
      return sendEmail(emailWrap)
        .then(() =>
          res.status(201).json({
            message: 'Created Successfully',
            fullName,
          }),
        )
        .catch((err) => res.status(400).json({ message: err }));
    }
    // development code:
    return res.status(201).json({
      message: 'Created Successfully',
      fullName,
      password,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const loginStudent = async (req, res) => {
  const { user } = res.locals;
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };
    res
      .cookie('auth', JSON.stringify(payload), {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 2592000), // 30 days
      })
      .status(200)
      .json({
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      });
  });
};

const testStudent = async (req, res) => res.json({ message: 'authorized!' });

module.exports = {
  createStudent,
  loginStudent,
  testStudent,
};
