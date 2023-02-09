/* eslint spaced-comment: 0 */
const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Task = require('../models/taskModel');
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

// const readMessage = async (req, res) => {
// };

// const completeTask = async (req, res) => {
//   const { id: studentId } = res.locals.user;
//   const { id: taskId } = req.params;
//   try {
//     const student = await Student.findById(studentId);
//     if(student){
//       student.tasks.forEach((task, i) => {
//         if (task.taskID.toString() === taskId) {
//           student.tasks[i] = !student.tasks[i];
//         }
//       });
//       await student.save();
//     }

//   return res.json({ message: 'task ' });
// } catch (err) {
//   return res.status(500).json({ error: err });
// }
// };

const getStudentProfile = async (req, res) => {
  const { id: studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({
        message: 'student not found',
      });
    }

    const timeSpent = {};
    const points = {};
    student.tasks.map(async (studentTask) => {
      const task = await Task.findById(studentTask.taskID);
      if (!task) {
        return res.status(400).json({
          message: 'task not found',
        });
      }
      if (!timeSpent[task.subject]) {
        timeSpent[task.subject] = studentTask.timeSpent;
      } else {
        timeSpent[task.subject] += studentTask.timeSpent;
      }
      // Calculate points from...
      return null;
    });

    // _id: studentId,
    //   timeSpent: {
    //   Mathematics: 1300000,
    //     Geography: 500000,
    // },
    // points: {
    //   Mathematics: 24,
    //     Geography: 12,
    return res.json({
      _id: studentId,
      timeSpent,
      points,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  createStudent,
  getStudent,
  getStudentProfile,
  getStudentTasks,
};
