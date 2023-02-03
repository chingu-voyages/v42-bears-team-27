const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['lesson', 'exercise', 'test'],
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
