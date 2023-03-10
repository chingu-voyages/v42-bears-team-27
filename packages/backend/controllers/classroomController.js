const Classroom = require('../models/classroomModel');
const Student = require('../models/studentModel');
const Event = require('../models/eventModel');
const Task = require('../models/taskModel');

const getClassroom = async (_, res) => {
  const { user } = res.locals;
  try {
    const classroom = await Classroom.findById(user.classroom)
      .populate('students', 'forename surname tasks')
      .populate('teacher', 'title forename surname');
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
    if (!updatedClassroom) {
      return res.status(500).json({ error: 'Classroom was not updated' });
    }

    return res.json({ message: 'Classroom updated!' });
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
const getClassroomSubjects = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  try {
    const classroom = await Classroom.findById(classroomId).populate(
      'subjects',
    );
    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }

    let { subjects } = classroom;

    if (req.query.name) {
      // If name is provided in query then find subjects with exact name
      subjects = subjects.filter((subject) => subject.slug === req.query.name);
    }

    return res.json(subjects);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/// Classroom Events
const getClassroomEvent = async (req, res) => {
  const { user } = res.locals;
  const { id: requestId } = req.params;
  try {
    // search by classroom to restrict search to only user's classroom
    const classroom = await Classroom.findById(user.classroom).populate({
      path: 'events',
      populate: {
        path: 'tasks',
      },
    });
    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }
    const event = classroom.events.find((e) => e._id.toString() === requestId);
    if (!event) return res.status(400).json({ message: 'event not found!' });

    return res.json(event);
  } catch (err) {
    return res.status(500).json(err);
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
      return res.status(400).json({ message: 'Classroom not found' });
    }

    return res.json(events);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addClassroomEvent = async (req, res) => {
  const { id: teacherId, classroom: classroomId } = res.locals.user;
  const { setAt, dueDate } = req.body;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }
    if (!classroom.teacher.equals(teacherId)) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const newEvent = await Event.create({
      classroom: classroomId,
      setAt: new Date(setAt),
      dueDate: new Date(dueDate),
    });
    if (!newEvent) {
      return res.status(500).json({ message: 'Server error' });
    }
    // Update tasks refs
    classroom.events.push(newEvent._id);
    await classroom.save();

    return res.json({ message: 'Event created!', _id: newEvent._id });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateClassroomEvent = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  const { dueDate, setAt } = req.body;
  try {
    const { events } = await Classroom.findById(classroomId);
    if (!events) {
      return res.status(400).json({ message: 'Classroom not found' });
    }
    if (!events.includes(requestId)) {
      return res
        .status(401)
        .json({ message: 'Event is not in your classroom' });
    }

    const update = {
      ...(!dueDate ? {} : { dueDate }),
      ...(!setAt ? {} : { setAt }),
    };

    const updatedEvent = await Event.findByIdAndUpdate(requestId, update, {
      new: true,
    });
    if (!updatedEvent) return res.status(500).send('error updating the event!');

    return res.json({ message: 'Event updated!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteClassroomEvent = async (req, res) => {
  const { id: teacherId, classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ message: 'classroom not found!' });
    }
    if (!classroom.teacher.equals(teacherId)) {
      return res.status(401).json({ message: 'Unauthorized access' });
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
          (el) => el.taskID.valueOf() !== deletedTask._id.valueOf(),
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
const getTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findById(taskId).populate({
      path: 'assignment',
      populate: {
        path: 'subject',
      },
    });
    if (!task) {
      return res.status(400).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addTask = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { event: eventId, assignment, assignmentModel } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: 'Event not found' });
    }
    if (!event.classroom.equals(classroomId)) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const newTask = await Task.create({
      event: eventId,
      assignment,
      assignmentModel,
    });
    if (!newTask) {
      return res.status(500).json({ message: 'Server error' });
    }
    // Add task to event
    event.tasks.push(newTask._id);
    await event.save();

    // Add task on each student
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(500).json({ message: 'Classroom not found' });
    }

    classroom.students.map(async (studentId) => {
      const student = await Student.findById(studentId);
      student.tasks.push({ taskID: newTask._id, event: eventId });
      await student.save();
    });

    return res.json({ message: 'Task created!', _id: newTask._id });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// const updateTask = async (req, res) => {
//   const { id: requestId } = req.params;
//   try {
//     const task = await Task.findById(requestId);
//     if (!task) {
//       return res.status(400).json({ message: 'task not found!' });
//     }
//     // TODO update task
//     return res.json({ message: 'task updated!' });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// }

const deleteTask = async (req, res) => {
  const { classroom: classroomId } = res.locals.user;
  const { id: requestId } = req.params;
  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ message: 'classroom not found!' });
    }
    const task = await Task.findById(requestId);
    if (!task) {
      return res.status(400).json({ message: 'task not found!' });
    }
    if (!classroom.events.includes(task.event)) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // delete task
    const deletedTask = await Task.findByIdAndDelete(requestId);
    if (!deletedTask) {
      return res.status(400).json({ message: 'task not found!' });
    }

    // delete task from event
    const event = await Event.findById(deletedTask.event);
    if (!event) {
      return res.status(400).json({ message: 'Event not found!' });
    }
    event.tasks.pull(deletedTask._id);
    await event.save();

    // delete tasks from students
    classroom.students.map(async (studentId) => {
      const student = await Student.findById(studentId);
      const filterTasks = student.tasks.filter(
        (el) => el.taskID.valueOf() !== deletedTask._id.valueOf(),
      );
      student.tasks = filterTasks;
      await student.save();
    });

    return res.json({ message: 'task deleted' });
  } catch (err) {
    return res.status(500).json(err);
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
  getTask,
  addTask,
  // updateTask,
  deleteTask,
};
