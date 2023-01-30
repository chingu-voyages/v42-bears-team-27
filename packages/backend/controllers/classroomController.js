const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');
const Event = require('../models/eventModel');

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
  const classroomId = res.locals.user.id;
  let classroom = await Classroom.findById(classroomId);

  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  classroom = {
    ...classroom,
    name: req.body.name,
    students: req.body.students,
    subjects: req.body.subjects,
    events: req.body.events,
  };

  await classroom.save();
  return res.json(classroom);
};

const deleteClassroom = async (req, res) => {
  const classroomId = res.locals.user.id;
  const classroom = await Classroom.findById(classroomId);

  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  await classroom.remove();

  return res.json({ message: 'Classroom deleted' });
};

/// Classroom Events

// TODO: It should return populated data for classroom events
// const getClassroomEvents = async (req, res) => {};

const addClassroomEvent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });

  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const newEvent = new Event({
    setAt: new Date(req.body.setAt),
    dueDate: new Date(req.body.dueDate),
    tasks: req.body.tasks,
  });

  await newEvent.save();

  return res.json(newEvent);
};

const updateClassroomEvent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });

  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    {
      setAt: new Date(req.body.setAt),
      dueDate: new Date(req.body.dueDate),
      tasks: req.body.tasks,
    },
    { new: true },
  );

  if (!updatedEvent)
    return res.status(400).send('the event cannot be updated!');

  return res.json(updatedEvent);
};

const deleteClassroomEvent = async (req, res) => {
  const event = await Classroom.events.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'classroom event not found' });
  }

  await event.remove();

  return res.json({ message: 'classroom event deleted' });
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
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addClassroomEvent,
  updateClassroomEvent,
  deleteClassroomEvent,
  broadcastMessage,
};
