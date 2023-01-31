/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');
const Classroom = require('../models/classroomModel');
const Subject = require('../models/subjectModel');

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
      const subjects = await Subject.find({});

      subjects.map((subject, idx) => {
        classroom.subjects[idx] = subject._id;
      });

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

// To be use for authentication when continuing the session
const getTeacher = async (req, res) => {
  const { user } = res.locals;
  return res.json({
    title: user.title,
    fullName: user.fullName,
  });
};

const sendDirectMessageToStudent = async (req, res) => {
  const { messageHeader, messageBody, studentID } = req.body;

  const teacher = res.locals.user;

  try {
    const student = await Student.findById(studentID);

    if (!student) {
      return res.status(400).json({ message: 'This student does not exist' });
    }

    if (!student.classroom.equals(teacher.classroom)) {
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
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const broadcastMessage = async (req, res) => {
  const { messageHeader, messageBody } = req.body;

  const teacherID = res.locals.user;

  try {
    const { students } = await Classroom.findOne({ teacher: teacherID });

    if (!students.length) {
      return res
        .status(400)
        .json({ message: 'You have no students in your classroom' });
    }

    const newMessage = await Message.create({
      isBroadcast: true,
      fromTeacher: teacherID,
      messageHeader,
      messageBody,
    });

    students.forEach(async (studentID) => {
      const student = await Student.findById(studentID);

      student.inbox.push({
        messageID: newMessage._id,
        hasBeenRead: false,
      });
      await student.save();
    });
    return res.status(200).json({ message: 'message sent!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createTeacher,
  getTeacher,
  sendDirectMessageToStudent,
  broadcastMessage,
};
