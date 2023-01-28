const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  type: ['lesson', 'exercise', 'test'],
  subject: {
    type: String,
    trim: true,
  },
  topic: {
    type: String,
    trim: true,
  },
  sourceUrl: {
    type: String,
    trim: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
