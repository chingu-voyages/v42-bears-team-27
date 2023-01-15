const Student = require('../models/studentModel');

const createStudent = (req, res) => {
  /*  fullName: 'FirstName, LastName',
      email: '123@123.com
      classroom: '63c339704aa8be1b4851e7b5'  */
  const { fullName, email, classroom } = req.body;
  // TODO generate password
  const password = 123456;
  const hashedPassword = password;
  // const hashedPassword = Student.hashPassword(password);
  Student.findOne({ fullName })
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
          res.status(201).json({
            message: 'Created Successfully',
            fullName,
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
