const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  dueDate: Date,
  setAt: Date,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
