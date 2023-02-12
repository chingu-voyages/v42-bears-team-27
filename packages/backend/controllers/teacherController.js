/* eslint-disable array-callback-return */
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');
const Classroom = require('../models/classroomModel');
const Subject = require('../models/subjectModel');

const createTeacher = async (req, res) => {
  /* 
    title: 'Mrs', 
    forename, 'Jane',
    surname,  'Doe',
    email: 'janedoe@example.com'
    password: '123456'
    confirmPassword: '123456'
  */

  const { title, forename, surname, email, password } = req.body;

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
    if (!classroom) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const subjects = await Subject.find({});
    if (!subjects) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    subjects.map((subject, idx) => {
      classroom.subjects[idx] = subject._id;
    });

    const teacher = await Teacher.create({
      title,
      forename,
      surname,
      email,
      passwordHash,
      classroom: classroom._id,
    });
    if (!teacher) {
      return res.status(500).json({ message: 'Internal server error' });
    }

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
        expires: new Date(Date.now() + 2592000000), // 30 days
      })
      .json({
        _id: teacher._id,
        title: teacher.title,
        forename: teacher.forename,
        surname: teacher.surname,
      });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// To check if still authenticated when continuing the session
const getTeacher = async (_, res) => {
  const { _id, title, forename, surname } = res.locals.user;
  return res.json({
    _id,
    title,
    forename,
    surname,
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
      fromTeacher: teacher._id,
      toStudent: student._id,
      messageHeader,
      messageBody,
    });
    if (!newMessage) {
      return res.status(500).json({ message: 'Internal server error' });
    }

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
  const { id: teacherId, classroom: classroomId } = res.locals.user;

  try {
    const { students } = await Classroom.findById(classroomId);

    if (!students.length) {
      return res
        .status(400)
        .json({ message: 'You have no students in your classroom' });
    }

    const newMessage = await Message.create({
      isBroadcast: true,
      fromTeacher: teacherId,
      messageHeader,
      messageBody,
    });
    if (!newMessage) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    students.forEach(async (studentId) => {
      const student = await Student.findById(studentId);
      if (student) {
        student.inbox.push({
          messageID: newMessage._id,
          hasBeenRead: false,
        });
        await student.save();
      } else {
        res
          .status(400)
          .json({ message: `Student ${student._id} does not exist` });
      }
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
