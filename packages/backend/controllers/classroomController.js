const Classroom = require('../models/classroomModel');

const getClassroom = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    res.status(404).json({ error: 'Classroom not found' });
  }
  if (
    !classroom.teacher.equals(req.user._id) ||
    !classroom.students.some((student) => student.equals(req.user._id))
  ) {
    res.status(401).json({ error: 'Unauthorized access' });
  }
  res.json(classroom);
};

// Not in use - classroom created on teacher creation
// const addClassroom = async (req, res) => {
//   const classroom = await Classroom.findOne({ teacher: req.user._id });
//   if (classroom) {
//     res.status(400).json({ error: 'Teacher already belongs to a classroom' });
//   }
//   const newClassroom = new Classroom({
//     name: req.body.name,
//     students: req.body.students,
//     teacher: req.user._id,
//     subjects: req.body.subjects,
//   });
//   await newClassroom.save();
//   res.json(newClassroom);
// };

const updateNameClassroom = async (req, res) => {
  const { user } = res.locals;
  const { name } = req.body;
  try {
    const classroom = await Classroom.findById(user.classroom);
    if (classroom) {
      classroom.name = name;
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
  updateNameClassroom,
  // deleteClassroom,
  // updateClassroom,
  getClassroom,
  // addClassroom,
};
