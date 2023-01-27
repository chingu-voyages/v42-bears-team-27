const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');

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

const broadcastMessage = async (req, res) => {
  const { messageHeader, messageBody } = req.body;

  const teacherID = res.locals.user;

  try {
    const { students } = await Classroom.findOne({ teacher: teacherID });

    if (!students.length) {
      return res
        .status(400)
        .json({ message: 'You have no students in your classroom' });
    }

    const newMessage = await Message.create({
      isBroadcast: true,
      fromTeacher: teacherID,
      messageHeader,
      messageBody,
    });

    students.forEach(async (studentID) => {
      const student = await Student.findById(studentID);

      student.inbox.push({
        messageID: newMessage._id,
        hasBeenRead: false,
      });
      await student.save();
    });
    return res.status(200).json({ message: 'message sent!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom,
  broadcastMessage,
};
