const Classroom = require('../models/classroomModel');

const getClassroom = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (
    !classroom.teacher.equals(res.locals.user.id) ||
    !classroom.students.some((student) => student.equals(res.locals.user.id))
  ) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  return res.json(classroom);
};

const addClassroom = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });
  if (classroom) {
    return res
      .status(400)
      .json({ error: 'Teacher already belongs to a classroom' });
  }
  const newClassroom = new Classroom({
    name: req.body.name,
    students: req.body.students,
    teacher: res.locals.user.id,
    subjects: req.body.subjects,
  });
  await newClassroom.save();
  return res.json(newClassroom);
};

const updateClassroom = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  classroom.name = req.body.name;
  classroom.students = req.body.students;
  classroom.subjects = req.body.subjects;
  await classroom.save();
  return res.json(classroom);
};

const deleteClassroom = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  await classroom.remove();
  return res.json({ message: 'Classroom deleted' });
};

module.exports = {
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
};
