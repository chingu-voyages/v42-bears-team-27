const Classroom = require('../models/classroomModel');
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

// const createClassroom = async (req, res) => {
//   const { user } = res.locals;
//   const { name, subjects } = req.body;
//   try {
//     const classroom = await Classroom.findById(user.classroom);
//     if (classroom) {
//       classroom.name = name;
//       classroom.subjects = subjects;
// TODO Add after subjects schema creation
// subjects.map(async (t) => {
//   const subjectToAdd = await Subject.findOne({ name: t });
//   classroom.subjects.push(subjectToAdd._id);
// })
//       await classroom.save();
//       return res.json(classroom);
//     }
//     return res.status(400).json({ message: 'Classroom not found' });
//   } catch (err) {
//     return res.status(500).json({ err });
//   }
// };

const updateClassroom = async (req, res) => {
  const teacherId = res.locals.user.id;
  try {
    const classroom = await Classroom.findOne({ teacher: teacherId });

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    if (!classroom.teacher.equals(res.locals.user.id)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // NOTE: This is may not be ideal,
    // but MongoDB will ignore any properties it doesn't recognize
    const update = {
      ...req.body,
    };

    const updatedClassroom = await Classroom.findOneAndUpdate(
      { teacher: teacherId },
      update,
      {
        new: true,
      },
    );

    return res.json(updatedClassroom);
  } catch (err) {
    return res.status(500).json({ err });
  }
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
const getClassroomEvent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });

  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const event = await Event.findById(req.params.id);

  if (!event) return res.status(400).send('the event not found!');

  const responseData = {
    setAt: event.setAt,
    dueDate: event.dueDate,
    tasks: event.tasks,
  };

  return res.json(responseData);
};

const getClassroomEvents = async (req, res) => {
  const { teacher, events } = await Classroom.findOne({
    teacher: res.locals.user.id,
  }).populate('events');

  if (!teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const responseData = events.map(({ _id: id, dueDate, setAt, tasks }) => ({
    id,
    dueDate,
    setAt,
    tasks,
  }));

  return res.json(responseData);
};

const addClassroomEvent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });

  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const newEvent = await Event.create({
    setAt: new Date(req.body.setAt),
    dueDate: new Date(req.body.dueDate),
    tasks: req.body.tasks,
  });

  if (newEvent) {
    // Update tasks refs
    const update = {
      events: [newEvent._id],
    };
    await Classroom.findByIdAndUpdate(classroom._id, update);
  }

  return res.end();
};

const updateClassroomEvent = async (req, res) => {
  const classroom = await Classroom.findOne({ teacher: res.locals.user.id });

  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  // NOTE: This is may not be ideal,
  // but MongoDB will ignore any properties it doesn't recognize
  const update = {
    ...req.body,
  };

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!updatedEvent)
    return res.status(400).send('the event cannot be updated!');

  return res.end();
};

const deleteClassroomEvent = async (req, res) => {
  const event = await Classroom.events.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'classroom event not found' });
  }

  await event.remove();

  return res.json({ message: 'classroom event deleted' });
};

/// Classroom Subjects
const getClassroomSubjects = async (req, res) => {
  const { teacher, subjects } = await Classroom.findOne({
    teacher: res.locals.user.id,
  }).populate('subjects');

  if (!teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const responseData = subjects.map(({ _id: id, title, topics }) => ({
    id,
    title,
    topics,
  }));

  return res.json(responseData);
};

module.exports = {
  getClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomSubjects,
  getClassroomEvent,
  getClassroomEvents,
  deleteClassroomEvent,
  addClassroomEvent,
  updateClassroomEvent,
};
