/* eslint spaced-comment: 0 */
const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');
const { generatePassword, sendEmail } = require('../utils');

const createStudent = async (req, res) => {
  /*  forename: 'FirstName',
      surname: 'LastName',
      email: '123@123.com,
      From Teacher Auth:
      classroom: '63c339704aa8be1b4851e7b5'  */
  const { forename, surname, email } = req.body;
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
      forename,
      surname,
      email,
      password: hashedPassword,
      classroom,
    });

    // Add Student to classroom collection DB
    const studentClassroom = await Classroom.findById(classroom).populate(
      'events',
    );
    if (!studentClassroom) {
      return res.status(400).json({
        message: 'classroom not found',
      });
    }
    studentClassroom.students.push(newStudent._id);
    await studentClassroom.save();

    // Add existing tasks to Student
    const studentTasks = [];
    studentClassroom.events.map((event) =>
      event.tasks.map((task) =>
        studentTasks.push({ taskID: task, event: event._id }),
      ),
    );
    newStudent.tasks = studentTasks;
    await newStudent.save();

    // Send email to student with the password
    if (process.env.NODE_ENV === 'production') {
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
            forename,
            surname,
          }),
        )
        .catch((err) => res.status(400).json({ message: err }));
    }
    // development code:
    return res.status(201).json({
      message: 'Created Successfully',
      forename,
      surname,
      password,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// To check if still authenticated when continuing the session
const getStudent = async (_, res) => {
  const { _id, forename, surname, inbox, tasks } = res.locals.user;
  return res.json({
    _id,
    forename,
    surname,
    inbox,
    tasks,
  });
};

const getStudentInbox = async (_, res) => {
  const { _id } = res.locals.user;
  const { inbox } = await Student.findById(_id);
  const allMessages = [];

  await Promise.all(
    inbox.map(async (msg) => {
      const fullMessage = await Message.findById(msg.messageID);
      allMessages.push({
        _id: fullMessage._id,
        messageHeader: fullMessage.messageHeader,
        messageBody: fullMessage.messageBody,
        hasBeenRead: msg.hasBeenRead,
      });
    }),
  );

  return res.status(200).json(allMessages.reverse());
};

const markMessageAsRead = async (req, res) => {
  const { messageID } = req.body;
  const { id: studentID } = res.locals.user;

  Student.findById(studentID)
    .then((doc) => {
      let messageFound = false;
      doc.inbox.forEach((item) => {
        if (item.messageID.equals(messageID)) {
          messageFound = true;
          // eslint-disable-next-line dot-notation
          item['hasBeenRead'] = true; // eslint-disable-line no-param-reassign
          doc.save();
        }
      });

      if (messageFound) {
        return res
          .status(200)
          .json({ message: 'successfully marked message as read' });
      }

      return res
        .status(400)
        .json({ message: `message with ID ${messageID} not found` });
    })
    .catch((err) => {
      console.log(
        `Error while trying to update message.hasBeenRead to true for 
         student ${studentID} and message ${messageID}, ${err}`,
      );
      return res.status(500).json({
        message: `internal server error`,
      });
    });
};

const getStudentProfile = async (req, res) => {
  const { id: studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate({
      path: 'tasks',
      populate: {
        path: 'taskID',
        populate: {
          path: 'assignment',
          populate: 'subject',
        },
      },
    });
    if (!student) {
      return res.status(400).json({
        message: 'student not found',
      });
    }

    const timeSpent = {};
    const points = {};
    student.tasks.map(async (task) => {
      // Calculate timeSpent
      if (task.timeSpent > 0) {
        if (!timeSpent[task.taskID.assignment.subject.title]) {
          timeSpent[task.taskID.assignment.subject.title] = task.timeSpent;
        } else {
          timeSpent[task.taskID.assignment.subject.title] += task.timeSpent;
        }
      }
      // Calculate points
      if (task.completed) {
        if (!points[task.taskID.assignment.subject.title]) {
          points[task.taskID.assignment.subject.title] =
            task.taskID.assignment.points;
        } else {
          points[task.taskID.assignment.subject.title] +=
            task.taskID.assignment.points;
        }
      }

      return null;
    });

    return res.json({
      _id: studentId,
      timeSpent,
      points,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getStudentTasks = async (req, res) => {
  const { user } = res.locals;
  try {
    const student = await Student.findById(user._id).populate({
      path: 'tasks',
      populate: {
        path: 'taskID',
        populate: {
          path: 'assignment',
          populate: 'subject',
        },
      },
    });
    // Check if student exists
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    let { tasks } = student;

    if (req.query.eventID) {
      // If eventID is provided in query then filter out tasks only for that event
      tasks = student.tasks.filter(
        (task) => task.event.valueOf() === req.query.eventID,
      );
    }

    return res.json(tasks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateStudentTask = async (req, res) => {
  const { user } = res.locals;
  const { task: taskId, addTime, completed } = req.body;
  try {
    const student = await Student.findById(user._id);
    // Check if student exists
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }
    if (taskId) {
      student.tasks.find((x) => x.taskID.toString() === taskId).timeSpent +=
        addTime;
    }
    if (typeof completed !== 'undefined') {
      student.tasks.find((x) => x.taskID.toString() === taskId).completed =
        completed;
    }
    await student.save();

    return res.json({ message: 'Student task updated!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createStudent,
  getStudent,
  getStudentInbox,
  markMessageAsRead,
  getStudentProfile,
  getStudentTasks,
  updateStudentTask,
};
