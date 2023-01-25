/* eslint spaced-comment: 0 */
const Student = require('../models/studentModel');
const { generatePassword, sendEmail } = require('../utils');

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
            // development only code:
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
