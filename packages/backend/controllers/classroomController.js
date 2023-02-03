const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Event = require('../models/eventModel');
const Task = require('../models/taskModel');

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
    if (!teacher._id.equals(teacherId)) {
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
    // TODO send only one request to DB & make sure event is inside teacher classroom
    const event = await Event.findById(requestId).populate('tasks');
    if (!event) return res.status(400).json('event not found!');

    return res.json(event);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getClassroomEvents = async (_, res) => {
  const { user } = res.locals;
  try {
    const { events } = await Classroom.findById(user.classroom).populate({
      path: 'events',
      populate: {
        path: 'tasks',
      },
    });
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
  const { setAt, dueDate } = req.body;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ error: 'Classroom not found' });
    }
    if (!classroom.teacher.equals(teacherId)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const newEvent = await Event.create({
      classroom: classroomId,
      setAt: new Date(setAt),
      dueDate: new Date(dueDate),
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

    const update = {
      ...(!req.body.dueDate ? {} : { dueDate: req.body.dueDate }),
      ...(!req.body.setAt ? {} : { setAt: req.body.setAt }),
    };

    const updatedEvent = await Event.findByIdAndUpdate(requestId, update, {
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

    const deletedEvent = await Event.findByIdAndDelete(requestId);
    if (!deletedEvent) {
      return res.status(400).json('event not found!');
    }

    deletedEvent.tasks.map(async (task) => {
      // delete tasks that belong to this event
      const deletedTask = await Task.findByIdAndDelete(task);
      if (!deletedTask) {
        res.status(400).json('task not found!');
      }
      // delete tasks from students
      classroom.students.map(async (studentId) => {
        const student = await Student.findById(studentId);
        const filterTasks = student.tasks.filter(
          (el) => el.taskID !== task._id,
        );
        student.tasks = filterTasks;
        await student.save();
      });
    });

    // delete event from classroom
    classroom.events.pull({ _id: requestId });
    await classroom.save();

    return res.json({ message: 'classroom event deleted' });
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

/// Classroom Tasks
const addTask = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { event: eventId, type, subject, topic } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ error: 'Event not found' });
    }
    if (!event.classroom.equals(classroomId)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const newTask = await Task.create({
      classroom: classroomId,
      type,
      subject,
      topic,
    });
    if (!newTask) {
      return res.status(500).json({ error: 'Server error' });
    }
    // Add task to event
    event.tasks.push(newTask._id);
    await event.save();

    // Add task on each student
    const classroom = await Event.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ error: 'Classroom not found' });
    }

    classroom.students.map(async (studentId) => {
      const student = await Student.findById(studentId);
      student.events.push(newTask._id);
      await student.save();
    });

    return res.json({ message: 'Task created!', id: newTask._id });
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

// const updateTask = async (req, res) => {
// }
const deleteTask = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json('classroom not found!');
    }
    const task = await Task.findBy(requestId);
    if (!task) {
      return res.status(400).json('task not found!');
    }
    if (!classroom.events.includes(task.event)) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // delete task
    const deletedTask = await Task.findByIdAndDelete(requestId);
    if (!deletedTask) {
      return res.status(400).json('task not found!');
    }

    // delete task from event
    const event = await Task.findById(deletedTask.event);
    if (!event) {
      return res.status(400).json('Event not found!');
    }
    event.tasks.pull(deletedTask._id);
    await event.save();

    // delete tasks from students
    classroom.students.map(async (studentId) => {
      const student = await Student.findById(studentId);
      const filterTasks = student.tasks.filter(
        (el) => el.taskID !== deletedTask._id,
      );
      student.tasks = filterTasks;
      await student.save();
    });

    return res.json({ message: 'task deleted' });
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
  addTask,
  // updateTask,
  deleteTask,
};
