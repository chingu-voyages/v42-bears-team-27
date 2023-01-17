const Student = require('../models/studentModel');
const generatePassword = require('../utils/generatePassword');

const createStudent = async (req, res) => {
  /*  fullName: 'FirstName, LastName',
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
        .then(() =>
          // TODO? send email to student with the password
          res.status(201).json({
            message: 'Created Successfully',
            fullName,
            // TODO remove once is sent by email
            password,
          }),
        )
        .catch((err) => res.status(400).json({ message: err }));
      return false;
    })
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports = {
  createStudent,
};
