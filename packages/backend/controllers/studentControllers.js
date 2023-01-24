const Student = require('../models/studentModel');
const Classroom = require('../models/classroomModel');
const { generatePassword, generateJWT } = require('../utils');

const createStudent = async (req, res) => {
  /*  fullName: 'LastName, FirstName',
      email: '123@123.com
      classroom: '63c339704aa8be1b4851e7b5'  */
  const { fullName, email, classroom } = req.body;
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

    // TODO (done in other branch) send email to student with the password
    return res.status(201).json({
      message: 'Created Successfully',
      fullName,
      // TODO remove once is sent by email
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
    const token = generateJWT(payload);
    return res.json({ email: user.email, token });
  });
};

const testStudent = async (req, res) => res.json({ message: 'authorized!' });

module.exports = {
  createStudent,
  loginStudent,
  testStudent,
};
