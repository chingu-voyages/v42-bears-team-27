const Classroom = require('../models/classroomModel');
const Event = require('../models/eventModel');

const getClassroom = async (_, res) => {
  const { user } = res.locals;
  try {
    const classroom = await Classroom.findById(user.classroom);
    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }
    return res.json(classroom);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const updateClassroom = async (req, res) => {
  const { id: teacherId, classroom: classroomId } = res.locals.user;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ error: 'Classroom not found' });
    }

    // Block from updating other properties
    const update = {
      ...(!req.body.name ? {} : { name: req.body.name }),
      ...(!req.body.subjects ? {} : { subjects: req.body.subjects }),
      ...(!req.body.events ? {} : { events: req.body.events }),
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

// Not used on the frontend
const deleteClassroom = async (_, res) => {
  const { classroom: classroomId } = res.locals.user;

  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    return res.status(400).json({ error: 'Classroom not found' });
  }
  if (!classroom.teacher.equals(res.locals.user.id)) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  await classroom.remove();

  return res.json({ message: 'Classroom deleted' });
};

/// Classroom Subjects
const getClassroomSubjects = async (_, res) => {
  const { id: teacherId, classroom } = res.locals.user;
  try {
    const { teacher, subjects } = await Classroom.findById(classroom).populate(
      'subjects',
    );
    if (!teacher) {
      return res.status(400).json({ error: 'Classroom not found' });
    }
    if (!teacher.id.equals(teacherId)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    return res.json(subjects);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

/// Classroom Events
const getClassroomEvent = async (req, res) => {
  const { user } = res.locals;
  const { id: requestId } = req.params;
  try {
    const classroom = await Classroom.findById(user.classroom);
    if (!classroom) {
      return res.status(400).json({ error: 'Classroom not found' });
    }

    const event = await Event.findById(requestId);
    if (!event) return res.status(400).json('event not found!');

    return res.json(event);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getClassroomEvents = async (_, res) => {
  const { user } = res.locals;
  try {
    const { events } = await Classroom.findById(user.classroom).populate(
      'events',
    );
    if (!events) {
      return res.status(400).json({ error: 'Classroom not found' });
    }

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const addClassroomEvent = async (req, res) => {
  const { id: teacherId, classroom: classroomId } = res.locals.user;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ error: 'Classroom not found' });
    }
    if (!classroom.teacher.equals(teacherId)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const newEvent = await Event.create({
      setAt: new Date(req.body.setAt),
      dueDate: new Date(req.body.dueDate),
      tasks: req.body.tasks,
    });
    if (!newEvent) {
      return res.status(500).json({ error: 'Server error' });
    }
    // Update tasks refs
    classroom.events.push(newEvent._id);
    await classroom.save();

    return res.json({ message: 'Event created!', id: newEvent._id });
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const updateClassroomEvent = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  try {
    const { events } = await Classroom.findById(classroomId);
    if (!events) {
      return res.status(400).json({ error: 'Classroom not found' });
    }
    if (!events.includes(requestId)) {
      return res.status(401).json({ error: 'Event is not in your classroom' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(requestId, req.body, {
      new: true,
    });
    if (!updatedEvent) return res.status(500).send('error updating the event!');

    return res.json({ message: 'Event updated!' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteClassroomEvent = async (req, res) => {
  const { id: teacherId, classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json('classroom not found!');
    }
    if (!classroom.teacher.equals(teacherId)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const deleted = await Event.findByIdAndDelete(requestId);
    if (!deleted) {
      return res.status(400).json('event not found!');
    }

    classroom.events.pull({ _id: requestId });
    await classroom.save();

    return res.json({ message: 'classroom event deleted' });
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

module.exports = {
  getClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomSubjects,
  getClassroomEvent,
  getClassroomEvents,
  addClassroomEvent,
  updateClassroomEvent,
  deleteClassroomEvent,
};
