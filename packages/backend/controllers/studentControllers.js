const Student = require('../models/studentModel');
const { generatePassword, generateJWT } = require('../utils');
// const { sendEmail } = require('../utils');

const createStudent = async (req, res) => {
  /*  fullName: 'LastName, FirstName',
      email: '123@123.com
      classroom: '63c339704aa8be1b4851e7b5'  */
  const { fullName, email, classroom } = req.body;
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
        classroom,
      })
        .then(() => {
          // TODO conditional if in production
          // send email to student with the password
          // const content = () => /*html*/`You have been registered into
          // Remote Class! Please use your email and this password to
          // login.<br>Password: ${password}`;
          // const emailWrap = {
          //   to: email,
          //   subject: 'Welcome to Remote Class',
          //   message: content(),
          // };
          // sendEmail(emailWrap)
          //   .then((message) => {
          //     res.status(201).json({
          //       message: 'Created Successfully',
          //       fullName
          //     });
          //   })
          //   .catch((err) => res.status(400).json({ message: err }));
          res.status(201).json({
            message: 'Created Successfully',
            fullName,
            // TODO remove once is sent by email
            password,
          });
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
