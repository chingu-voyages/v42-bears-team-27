/* eslint spaced-comment: 0 */
const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
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

// To check if still authenticated when continuing the session
const getStudent = async (_, res) => {
  const { _id, fullName, inbox } = res.locals.user;
  return res.json({
    _id,
    fullName,
    inbox,
  });
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

module.exports = {
  createStudent,
  getStudent,
  markMessageAsRead,
};
