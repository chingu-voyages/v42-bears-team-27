const Classroom = require('../models/classroomModel');

const getClassroom = async (req, res) => {
  const { user } = res.locals;
  try {
    const classroom = await Classroom.findById(user.classroom);
    if (classroom) {
      return res.json(classroom);
    }
    return res.status(400).json({ message: 'Classroom not found' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const createClassroom = async (req, res) => {
  const { user } = res.locals;
  const { name, subjects } = req.body;
  try {
    const classroom = await Classroom.findById(user.classroom);
    if (classroom) {
      classroom.name = name;
      classroom.subjects = subjects;
      // TODO Add after subjects schema creation
      // subjects.map(async (t) => {
      //   const subjectToAdd = await Subject.findOne({ name: t });
      //   classroom.subjects.push(subjectToAdd._id);
      // })
      await classroom.save();
      return res.json(classroom);
    }
    return res.status(400).json({ message: 'Classroom not found' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// const updateStudentsClassroom = async (req, res) => {
//   const { id, add, remove } = req.body
//   try {
//     const classroom = await Classroom.findById(id)
//     if (classroom) {
//       classroom.students.push(add)
//       await classroom.save();
//       return res.json(classroom);
//     }
//     return res.status(400).json({ message: 'Classroom not found or error' });
//   } catch (err) {
//     return res.status(500).json({ err });
//   }
// };

// Not in use
// const updateClassroom = async (req, res) => {
//   // TODO be able to edit only one field
//   const classroom = await Classroom.findById(req.params.id);
//   if (!classroom) {
//     res.status(404).json({ error: 'Classroom not found' });
//   }
//   // TODO create middleware for this using passport
//   if (!classroom.teacher.equals(req.user._id)) {
//     res.status(401).json({ error: 'Unauthorized access' });
//   }
//   classroom.name = req.body.name;
//   classroom.students = req.body.students;
//   classroom.subjects = req.body.subjects;
//   await classroom.save();
//   res.json(classroom);
// };

// const deleteClassroom = async (req, res) => {
//   const classroom = await Classroom.findById(req.params.id);
//   if (!classroom) {
//     res.status(404).json({ error: 'Classroom not found' });
// }
// if (!classroom.teacher.equals(req.user._id)) {
//   res.status(401).json({ error: 'Unauthorized access' });
// }
//   await classroom.remove();
//   res.json({ message: 'Classroom deleted' });
// };

module.exports = {
  createClassroom,
  getClassroom,
  // updateClassroom,
  // deleteClassroom,
};
