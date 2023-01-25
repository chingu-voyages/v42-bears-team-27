/* eslint spaced-comment: 0 */
const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const { generatePassword, generateJWT, sendEmail } = require('../utils');

const createStudent = async (req, res) => {
  /*  fullName: 'LastName, FirstName',
      email: '123@123.com
  */
  const { fullName, email } = req.body;

  const teacherId = res.locals.user.id;
  const teachersClassroom = await Classroom.findOne({ teacher: teacherId });
  if (!teachersClassroom) {
    // TODO: Remove this because it cannot happen in the future
    return res.status(400).json({ error: 'Classroom not found' });
  }
  if (!teachersClassroom.teacher.equals(teacherId)) {
    return res.status(403).json({
      error: 'Unauthorized! You cannot add students to this classroom.',
    });
  }

  const password = generatePassword(6);
  const hashedPassword = await Student.hashPassword(password);
  Student.findOne({ email })
    .then((student) => {
      if (student) {
        return res.status(400).json({
          message: `Student: ${fullName} is already in your classroom`,
        });
      }

      Student.create({
        fullName,
        email,
        password: hashedPassword,
        classroom: teachersClassroom,
      })
        .then(async (newStudent) => {
          teachersClassroom.students.push(newStudent._id);
          await teachersClassroom.save();
        })
        .then(() => {
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
            sendEmail(emailWrap)
              .then(() =>
                res.status(201).json({
                  message: 'Created Successfully',
                  fullName,
                }),
              )
              .catch((err) => res.status(400).json({ message: err }));
          } else {
            // development code:
            return res.status(201).json({
              message: 'Created Successfully',
              fullName,
              password,
            });
          }
          return false;
        })
        .catch((err) => res.status(400).json({ message: err }));
      return false;
    })
    .catch((err) => res.status(500).json({ message: err }));
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
