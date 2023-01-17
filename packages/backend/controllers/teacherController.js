const Teacher = require('../models/teacherModel');

const createTeacher = async (req, res) => {
  /*  
    name: 'Jane Doe',
    email: 'janedoe@example.com'
    password: '123456'
  */

  const { name, email, password } = req.body;

  // TODO: hash the password
  const passwordHash = password;

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

    const created = await Teacher.create({
      name,
      email,
      passwordHash,
    });

    if (created) {
      return res.status(201).json({
        message: 'Account created successfully',
      });
    }
  } catch (error) {
    // TODO: more robust logging (morgan?)
    // TODO: log other events too? not just errors?
    console.log(`Error while saving teacher to database${error}`);
    return res.status(500).json({ message: 'Inetrnal server error' });
  }
};

module.exports = { createTeacher };
