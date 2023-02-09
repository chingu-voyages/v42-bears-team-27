const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'assignmentModel',
  },
  assignmentModel: {
    type: String,
    required: true,
    enum: ['Lesson', 'Exercise'],
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
