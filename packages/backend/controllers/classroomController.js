const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Message = require('../models/messageModel');
const Event = require('../models/eventModels');



const getClassroom = async (req, res) => {
   const classroomId = res.locals.user.id
  const classroom = await Classroom.findById( classroomId);
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
    events : req.body.events
  });
  await newClassroom.save();
  return res.json(newClassroom);
};

const updateClassroom = async (req, res) => {
  const classroomId = res.locals.user.id
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  classroom.name = req.body.name,
  classroom.students = req.body.students,
  classroom.subjects = req.body.subjects,
  classroom.events = req.body.events
  await classroom.save();
  return res.json(classroom);
};

const deleteClassroom = async (req, res) => {
  const classroomId = res.locals.user.id
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

// add event

const addClassroomevent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  const newEvent = new Event({
    
    name: req.body.name,
    created_date: new Date(req.body.created_date),
    due_date: new Date(req.body.due_date),
    task: req.body.task,
  });
  await newEvent.save();
  return res.json(newEvent)
  
};

// update event

const updateClassroomevent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
 
  const newEvent = await Event.findByIdAndUpdate(
    req.params.id,
    {
    name: req.body.name,
    created_date: new Date(req.body.created_date),
    due_date: new Date(req.body.due_date),
    task: req.body.task,
  },
  { new: true}
  )
  if(!newEvent)
  return res.status(400).send('the event cannot be updated!')

  return res.json(newEvent)
  
};

// delete event
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
  deleteClassroom,
  updateClassroom,
  getClassroom,
  addClassroom,
  broadcastMessage,
  deleteClassroomEvent,
  addClassroomevent,
  updateClassroomevent,
};
