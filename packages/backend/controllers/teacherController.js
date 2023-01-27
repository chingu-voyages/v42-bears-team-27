/* eslint-disable consistent-return */
const Teacher = require('../models/teacherModel');
const Message = require('../models/messageModel');
const Student = require('../models/studentModel');
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

    const teacher = await Teacher.create({
      title,
      fullName,
      email,
      passwordHash,
    });

    if (teacher) {
      const payload = {
        _id: teacher._id,
        email: teacher.email,
      };
      // const token = generateJWT(payload);
      return res
        .cookie('auth', JSON.stringify(payload), {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          signed: true,
          expires: new Date(Date.now() + 2592000), // 30 days
        })
        .json({
          id: teacher._id,
          title: teacher.title,
          fullName: teacher.fullName,
          email: teacher.email,
        });
    }
  } catch (error) {
    // TODO: more robust logging (morgan?)
    // TODO: log other events too? not just errors?
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

const sendDirectMessageToStudent = async (req, res) => {
  const { messageHeader, messageBody, studentID } = req.body;

  const teacher = res.locals.user;

  try {
    const student = await Student.findById(studentID);
    const classroom = await Classroom.findOne({ teacher });

    if (!student) {
      return res.status(400).json({ message: 'This student does not exist' });
    }

    if (!student.classroom.equals(classroom._id)) {
      return res
        .status(400)
        .json({ message: 'This student is not in your classroom' });
    }

    const newMessage = await Message.create({
      isBroadcast: false,
      fromTeacher: teacher.id,
      toStudent: student.id,
      messageHeader,
      messageBody,
    });

    student.inbox.push({
      messageID: newMessage._id,
      hasBeenRead: false,
    });
    await student.save();

    return res.status(200).json({ message: 'message sent!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const testTeacher = async (req, res) =>
  res.json({ message: 'authenticated teacher!' });

module.exports = {
  createTeacher,
  loginTeacher,
  sendDirectMessageToStudent,
  testTeacher,
};
